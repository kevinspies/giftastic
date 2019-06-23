var videogames = [];
var videogame;

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttontab").empty();

    // Looping through the array of movies
    for (var i = 0; i < videogames.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var newbutton = $("<button>");
        // Adding a class
        newbutton.addClass("videogame");
        // Added a data-attribute
        newbutton.attr("data-name", videogames[i]);
        // Provided the initial button text
        newbutton.text(videogames[i]);
        // Added the button to the HTML
        $("#buttontab").append(newbutton);
    }
}

// Event listener button generator, not using API yet here!
$("#submit").on("click", function () {//problem with where my on clicks are happening?
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
    videogame = $("#search").val().trim();
    videogames.push(videogame);
    console.log(videogame);
    renderButtons();

});

// Constructing a URL to search Giphy for the name of the person who said the quote
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    videogame + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

// Performing our AJAX GET request
$.ajax({
    url: queryURL,
    method: "GET"
})
    // After the data comes back from the API
    .then(function (response) {
        // Storing an array of results in the results variable
        // var results = response.data; 
        console.log(response);
        var result = response.data;
        console.log(result[0].url);

        var imageURL = result[0].url;
        var gameImage = $("<img>");
        gameImage.attr("src", imageURL);
        gameImage.attr("alt", "wataaaaap");
        $("#images").prepend(gameImage);


    });

