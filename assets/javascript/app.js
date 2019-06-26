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
    console.log("videogame is: " + videogame);//works
    renderButtons();
});

$("body").on("click", ".videogame", function (event) {//top bar of buttons
    event.preventDefault();
    console.log("hi");
    // var thisgame = $(this).attr("data-name");//not working?
    var thisgame = $(this).attr("data-name");
    // console.log("why undefined!!! " + $(this).attr("data-name"));//undefined
    console.log("using .attr(data-name) if this works i'm gucci: " + thisgame);
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        thisgame + "&api_key=" + key + "&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var vgDiv = $("<div>");//videogame vid
                var p = $("<p>").text("Rating: " + results[i].rating);
                var vgImage = $("<img>");
                vgImage.attr("src", results[i].images.original_still.url);
                vgImage.attr("class", ".gif");
                vgImage.attr("data-still", results[i].images.original_still.url);
                vgImage.attr("data-animate", results[i].images.original_.url);
                vgDiv.append(p);
                vgDiv.append(vgImage);
                $("#images").append(vgDiv);
            }


        });

})

$(".gif").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
