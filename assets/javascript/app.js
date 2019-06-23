var videogames = [];

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

// Event listener for all button elements
$("button").on("click", function () {
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
    var videogame = $("#search").val().trim();
    videogames.push(videogame);
    console.log(videogame);
    renderButtons();

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

            //code hre to render some gifs oh heeell yeah
            // Looping over every result item
            // for (var i = 0; i < results.length; i++) {
            //     // Only taking action if the photo has an appropriate rating
            //     if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            //         // Creating a div for the gif
            //         var gifDiv = $("<div>");
            //         // Storing the result item's rating
            //         var rating = results[i].rating;
            //         // Creating a paragraph tag with the result item's rating
            //         var p = $("<p>").text("Rating: " + rating);
            //         // Creating an image tag
            //         var personImage = $("<img>");
            //         // Giving the image tag an src attribute of a proprty pulled off the
            //         // result item
            //         personImage.attr("src", results[i].images.fixed_height.url);
            //         // Appending the paragraph and personImage we created to the "gifDiv" div we created
            //         gifDiv.append(p);
            //         gifDiv.append(personImage);
            //         // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            //         $("#gifs-appear-here").prepend(gifDiv);
            //     }
            // }
        });
});
