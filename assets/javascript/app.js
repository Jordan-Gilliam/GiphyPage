$(document).ready(function() {




    // Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

    var topics = ["Rick Sanchez", "Morty Smith", "Summer Smith", "Jerry Smith"];
    // Your app should take the topics in this array and create buttons in your HTML.

    function renderButton() {

        $("#buttonHere").empty();
        // Try using a loop that appends a button for each string in the array.
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var buttons = $("<button>");
            // Adding a class
            buttons.addClass("buttonClass");
            // Adding a data-attribute with a value of the movie at index i
            buttons.attr("data-button", topics[i]);
            // Providing the button's text with a value of the movie at index i
            buttons.text(topics[i]);
            // Adding the button to the HTML
            $("#buttonHere").append(buttons);

            // console.log(buttons);
        }

    }





    renderButton();

    $(document).on("click", ".buttonClass", function() {


        var rickAndMorty = $(this).attr("data-button");



        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            rickAndMorty + "&api_key=dc6zaTOxFJmzC&limit=10";


        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);


                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // create div for rating
                    var giphyDiv = $("<div>");

                    // Under every gif, display its rating (PG, G, so on).
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // create image in DOM
                    var gifImage = $("<img>");

                    gifImage.attr("src", results[i].images.original_still.url);
                    gifImage.attr("data-still", results[i].images.original_still.url);
                    gifImage.attr('data-animate', results[i].images.original.url);
                    gifImage.attr('data-state', 'still');
                    gifImage.addClass("rickAndMorty-image");


                    giphyDiv.append(p);
                    giphyDiv.append(gifImage);

                    $("#gifHere").prepend(giphyDiv);

                }
            });
    });


    // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

    // add pause function
    $(document).on('click', ".rickAndMorty-image", function() {

        var state = $(this).attr('data-state');

        if (state === "still") {
            var activeImg = $(this).attr("data-animate");
            $(this).attr("src", activeImg);
            $(this).attr("data-state", "animate");
        }

        else {
            var quietImg = $(this).attr("data-still");
            $(this).attr("src", quietImg);
            $(this).attr("data-state", "still");
        }
    });


    $("#add-gifs").on("click", function(event) {
        event.preventDefault();

        var newGif = $("#gifs-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(newGif);
        console.log(topics);

        $("#buttonHere").append(newGif);

        // calling renderButtons which handles the processing of our movie array
        renderButton();
    });


});
