require("dotenv").config();
var axios = require("axios")
var moment = require("moment")

//
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

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
// node liri.js movie-this alien

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

function concerts() {

    var query = "https://rest.bandsintown.com/artists/" + key + "/events?app_id=codingbootcamp"

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


function songs() {

    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    spotify.search({ type: 'track', query: key }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var array = data.tracks.items;
        var filteredResultsArray = [];

        for (var i = 0; i < array.length; i++) {
            let 
        }



        // for loop
        // console.log the info



    });


}

function movies() {


}

function answer() {



}