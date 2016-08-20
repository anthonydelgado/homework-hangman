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
    gameOver = false;
    var things = ['Rock', 'Paper', 'Scissor', 'Life', 'Game', 'wow', 'you', 'mail', 'drama', 'horror', 'neemo', 'simpsons', 'war', 'love', 'party'];
    var thing = things[Math.floor(Math.random() * things.length)];


    $.ajax({
        url: "http://www.omdbapi.com/?t=" + thing + "&plot=full&r=json",
        async: false,
        dataType: 'json',
        success: function (data) {

            movieToGuess = data.Title.toLowerCase();
            moviePoster = data.Poster;

            console.log('The NEW movie to guess is ' + movieToGuess);


            document.querySelector('#movie-plot').innerHTML = data.Plot;

            document.querySelector('#movie-date').innerHTML = 'Released in ' + data.Year;

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
            imageUrl: moviePoster
        });

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