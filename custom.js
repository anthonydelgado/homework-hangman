/**
 * Hangman JS Game
 * Created by Anthony Delgado on 8/19/16.
 */


    var winCount = 0; 
    var movieToGuess = {};

    function getNewMovie() {

        var things = ['Rock', 'Paper', 'Scissor', 'Life', 'Game', 'wow', 'you', 'mail', 'drama', 'horror', 'neemo', 'simpsons', 'war', 'love', 'party'];
        var thing = things[Math.floor(Math.random() * things.length)];


        $.ajax({
            url: "http://www.omdbapi.com/?t=" + thing + "&plot=full&r=json",
            async: false,
            dataType: 'json',
            success: function (data) {
                movieToGuess = data.Title;
                console.log('The NEW movie to guess is ' + data.Title);

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


            }
        });
    }

    getNewMovie();

    function scoreBoard() {

        winCount++;
        // Placing the html into the game ID
        document.querySelector('#score-board').innerHTML = winCount;

    }

    function checkKeyup(letterPressed, movieToGuess) {

        console.log('searching for ' + letterPressed + ' in movie title ' + movieToGuess);


        for (var i = 0; i < movieToGuess.length; i++) {

            console.log(movieToGuess[i]);
            if (movieToGuess[i].toLowerCase() === letterPressed) {

                console.log('The letter ' + letterPressed + ' was found in the movie title ' + movieToGuess);

                $("." + letterPressed).removeClass("opacity");

                scoreBoard();

            }
        }


        // document.querySelector('#movie-title').innerHTML = titleSpacer;

    }


    document.onkeyup = function () {

        // Determines which exact key was selected. Make it lowercase
        var userKeyup = String.fromCharCode(event.keyCode).toLowerCase();

        checkKeyup(userKeyup, movieToGuess);


    }

