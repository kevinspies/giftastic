var videogames = [];
var videogame;
var key = "KjWAKsFTOTtN5AD3PQQa4UA5Xj8nhPYH";//my key! mine!

function renderButtons() {
    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttontab").empty();
    // Looping through the array of movies
    for (var i = 0; i < videogames.length; i++) {
        var newbutton = $("<button>");//let's store newbutton somewhere so we can access later
        newbutton.addClass("videogame");
        newbutton.attr("data-name", videogames[i]);
        newbutton.text(videogames[i]);
        $("#buttontab").append(newbutton);//are these buttons getting lost?
    }
}

// Event listener button generator
$("#submit").on("click", function (event) {
    event.preventDefault();
    videogame = $("#search").val().trim();
    videogames.push(videogame);
    console.log("blah blah " + videogame);//works
    renderButtons();
});

$(document).ready(function () {
    //--------------top tab button on click takes everything below-------------------------------------
    // $("button").on("click", function () {
    $("body").on("click", ".videogame", function (event) {
        event.preventDefault();
        console.log("hi");
        // var thisgame = $(this).attr("data-name");//not working?
        var thisgame = $(this).attr("data-name");
        // console.log("why undefined!!! " + $(this).attr("data-name"));//undefined
        console.log("using .attr(data-name) if this works i'm gucci: " + thisgame);
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            thisgame + "&api_key=" + key + "&limit=5";

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
                // console.log(result[0].image_original_url);

                var imageURL = result[0].bitly_gif_url;
                var gameImage = $("<img>");
                gameImage.attr("src", imageURL);
                gameImage.attr("alt", "Wazzaap");
                $("#images").prepend(gameImage);

            });
        //--------------top tab button on click takes everything above-------------------------------------
    })
})
