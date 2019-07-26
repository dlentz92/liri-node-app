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


function movies() {
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.

    var queryUrl = "http://www.omdbapi.com/?t=" + key + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            // console.log(response);
            var movie = response.data;

            console.log("Title: " + movie.Title)
            console.log("Year:" + movie.Year)
            console.log("Imbd rating: " + movie.imdbRating)
            console.log("rotten tomatoes: " + movie.Ratings.Source)
            console.log("produced in :" + movie.Country)
            console.log("language: " + movie.Language)
            console.log("plot: " + movie.Plot)
            console.log("actors: " + movie.Actors)

        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    };


// fs.readFile("movies.txt", "utf8", function(error, data) {

//     // If the code experiences any errors it will log the error to the console.
//     if (error) {
//       return console.log(error);
//     }

//     // We will then print the contents of data
//     console.log(data);

//     // Then split it by commas (to make it more readable)
//     var dataArr = data.split(",");

//     // We will then re-display the content as an array for later use.
//     console.log(dataArr);

//   });
function answer() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var data = data.split(", ");
        console.log(data);

        // for (var i = 0; i < data.length; i++) {
        //     console.log(data[i])
        // }
        spotify.search({ type: 'track', query: (data[1] || key) },
            function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(data);
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
    })
}

