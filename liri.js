require("dotenv").config();
var axios = require("axios")
var moment = require("moment")

//
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);


var fs = require("fs");
///

// operation / key

var operation = process.argv[2]
var key = process.argv.slice(3).join(" ")

console.log(process.argv.slice(3))
console.log(process.argv.slice(3).join(" "))
console.log("input: ", operation, key)


// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (operation) {
    case 'concert-this':
        concerts()
        break;
    case 'spotify-this-song':
        songs()
        break;
    case 'movie-this':
        movies()
        break;
    case 'do-what-it-says':
        answer()
        break;
    default:
        console.log("operation not existing")
}

function concerts(searchTerm) {

    var query = "https://rest.bandsintown.com/artists/" + (searchTerm || key) + "/events?app_id=codingbootcamp"

    axios.get(query).then(function (res) {

        var array = res.data
        //console.log(array)

        for (var i = 0; i < array.length; i++) {
            console.log(array[i].venue.name)
            console.log(array[i].venue.country + "-" + array[i].venue.city)
            console.log(moment(array[i].datetime).format("MM/DD/YYYY"))
            console.log("------")
        }

    })

}


function songs(searchTerm) {

    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    spotify.search({ type: 'track', query: (searchTerm || key) }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var array = data.tracks.items;
        var filteredResultsArray = [];
        for (var i = 0; i < array.length; i++) {
            let song = array[i];
            let songDetails = [];
            songDetails.push('artist: ', song.album.artists[0].name);
            songDetails.push('song: ', song.name);
            songDetails.push('link: ', song.preview_url);
            songDetails.push('album: ', song.album.name);
            filteredResultsArray.push(songDetails);
        }
        console.log(filteredResultsArray);
    });

}


function movies(searchTerm) {
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.

    var queryUrl = "http://www.omdbapi.com/?t=" + (searchTerm || key) + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });


    // var array = movieName;
    // var filteredResultsArray = [];
    // for (var i = 0; i < array.length; i++) {
    //     let movie = array[i];
    //     let movieDetails = [];

    // console.log(omdbKey.id, 'id');
    // let localKey = omdbKey.id;
    // var params = {
    //     apiKey: localKey,
    //     title: key
    // }
    // console.log(omdbKey);

    // omdbApi.get(params, function (err, data) {
    //         // process response...

    // console.log('data', data);

    // movieDetails.push('title: ', movie.title);
    // movieDetails.push('release year: ', movie.year);
    // movieDetails.push('IMBD rating: ', movie.imbdRating);
    // movieDetails.push('Rotten Tomatoes rating: ', movie.ratings);
    // // movieDetails.push('Movie filmed in: ', movie.);
    // movieDetails.push('language: ', movie.language);
    // movieDetails.push('plot: ', movie.plot);
    // movieDetails.push('actors: ', movie.actors);
    // filteredResultsArray.push(movieDetails);
    // console.log(filteredResultsArray);
    // });
}

function answer() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(", ");
        var searchTerm = data.slice(1).join(" ")
        console.log(data);
        console.log(searchTerm);
        switch (data[0]) {
            case 'concert-this':
                concerts(searchTerm)
                break;
            case 'spotify-this-song':
                songs(searchTerm)
                break;
            case 'movie-this':
                movies(searchTerm)
                break;
        }

        // spotify.search({ type: 'track', query: key }, function (err, data) {
        //     if (err) {
        //         return console.log('Error occurred: ' + err);
        //     }

        // var array = data.tracks.items;
        // var filteredResultsArray = [];
        // for (var i = 0; i < array.length; i++) {
        //     let song = array[i];
        //     let songDetails = [];
        //     songDetails.push('artist: ', song.album.artists[0].name);
        //     songDetails.push('song: ', song.name);
        //     songDetails.push('link: ', song.preview_url);
        //     songDetails.push('album: ', song.album.name);
        //     filteredResultsArray.push(songDetails);
        // }
        // console.log(filteredResultsArray);
        // });
        // fs.appendFile("random.txt", ", " + function(err) {
        //     if (err) {
        //       return console.log(err);
        //     }
        //   });
    })
}