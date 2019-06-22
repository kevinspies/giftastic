var topics = ["tennis", "coldplay", "pokemon"];

$("#submitButton").on("click", function (event) {

    event.preventDefault();
    // var mykey = "KjWAKsFTOTtN5AD3PQQa4UA5Xj8nhPYH";
    var mykey = "trilogy";
    var topic = $("#search").val();//get user input
    console.log(topic);
    var topicURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + mykey + "&limit=5";


    $.ajax({
        url: topicURL,
        method: "GET"
    }).then(function (response) {



    });
})