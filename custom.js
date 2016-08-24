/**
 * Hangman JS Game
 * Created by Anthony Delgado on 8/19/16.
 */


var winCount = 0;
var movieToGuess = {};
var movieToGuessLength;
var moviePoster;
var gameOver = true;

function getNewMovie() {

    var things = ['men+in+black', 'citizen+kane', 'jungle+book', 'zootopia', 'godfather', 'kung+fu+panda', 'hunger+games', 'lego+movie', 'catch+me+if+you+can', 'Knocked+Up', 'ghostbusters', 'neemo', 'simpsons', 'the+matrix', 'star+trek', 'zodiac'];
    var thing = things[Math.floor(Math.random() * things.length)];


    $.ajax({
        url: "http://www.omdbapi.com/?t=" + thing + "&plot=full&r=json",
        async: false,
        dataType: 'json',
        success: function (data) {

            movieToGuess = data.Title.toLowerCase();
            moviePoster = data.Poster;

            console.log('The NEW movie to guess is ' + movieToGuess);


            document.querySelector('#movie-plot').innerHTML = 'Plot: ' + data.Plot;

            document.querySelector('#movie-date').innerHTML = 'Released: ' + data.Year;

            var chipStars = '<div class="chip">';

            for (var i = 0; i < data.Actors.length; i++) {
                if (data.Actors[i].includes(",")) {
                    chipStars = chipStars + '</div><div class="chip">';
                } else {
                    chipStars = chipStars + data.Actors[i];
                }
            }
            chipStars = chipStars + '</div>';

            document.querySelector('#movie-stars').innerHTML = 'Staring: ' + chipStars;


            var genreStars = '<div class="chip">';

            for (var i = 0; i < data.Genre.length; i++) {
                if (data.Genre[i].includes(",")) {
                    genreStars = genreStars + '</div><div class="chip">';
                } else {
                    genreStars = genreStars + data.Genre[i];
                }
            }
            genreStars = genreStars + '</div>';
            document.querySelector('#movie-genre').innerHTML = 'Genre: ' + genreStars;


            var titleSpacer = '';

            for (var i = 0; i < data.Title.length; i++) {

                if (data.Title[i].includes(" ")) {

                    titleSpacer = titleSpacer + ' - ';

                } else {
                    titleSpacer = titleSpacer + '<span class="opacity ' + data.Title[i].toLowerCase() + '">' + data.Title[i] + '</span>';
                }
            }

            document.querySelector('#movie-title').innerHTML = titleSpacer;

            movieToGuess = movieToGuess.replace(/\s+/g, '');

            movieToGuess = movieToGuess.split("");

        }
    });



    gameOver = false;

}

function randomWrongGif() {

    var x = Math.floor((Math.random() * 10) + 1);

    swal({
        title: "Wrong Letter",
        text: "Would you like to keep playing?",
        imageUrl: 'images/wrong' + x + '.gif',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, keep playing!",
        cancelButtonText: "No, try a new movie!"
    }, function (isConfirm) {
        if (isConfirm) {

        }else{
            getNewMovie();
        }
    });

}

function scoreBoard() {

    winCount++;
    // Placing the html into the game ID
    document.querySelector('#score-board').innerHTML = winCount;

}

function checkKeyup(letterPressed, movieToGuess) {

    console.log('searching for ' + letterPressed + ' in movie title ' + movieToGuess);


    for (var i = 0; i < movieToGuess.length; i++) {

        if (movieToGuess[i].toLowerCase() === letterPressed) {

            console.log('The letter ' + letterPressed + ' was found in the movie title ' + movieToGuess);

            $("." + letterPressed).removeClass("opacity");

            scoreBoard();
            movieToGuess.splice(i, 1);

        }else{
            // randomWrongGif();
        }
    }


    var index = movieToGuess.indexOf(letterPressed);
    // Note: browser support for indexOf is limited; it is not supported in Internet Explorer 7 and 8.
    // Then remove it with splice:

    if (index > 1) {
        movieToGuess = movieToGuess.splice(index, 1);
        console.log('new value is ' + movieToGuess);
    }

    console.log(movieToGuess.length);
    if (movieToGuess.length === 0) {

        swal({
            title: "YOU WIN!",
            text: "Would you like to play again?",
            imageUrl: moviePoster,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, play again!",
            cancelButtonText: "No, cancel replay!"
        }, function (isConfirm) {
            if (isConfirm) {
                getNewMovie();
            }
        });

        gameOver = true;
    }

}


document.onkeyup = function () {

    if (gameOver === false) {
        // Determines which exact key was selected. Make it lowercase
        var userKeyup = String.fromCharCode(event.keyCode).toLowerCase();

        checkKeyup(userKeyup, movieToGuess);

    }

}


$(document).ready(function () {
    getNewMovie();
});