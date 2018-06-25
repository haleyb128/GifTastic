var topics = ["doge", "sea puppy", "cat snake", "danger noodle", "trash panda", "small floof", "pupper", "doggo"];
  
function displayTopicInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        let results = response.data;
        $("#topics-view").empty();
        for (var i = 0; i < results.length; i++) {
            let gifDiv = $("<div>");
            gifDiv.addClass("gif-div");
            let rating = results[i].rating;
            let p = $("<p>").text("Rating: " + rating);
            p.addClass("font-weight-light ratingp text-center")
            let gifImage = $("<img>");
            gifImage.addClass("gif shadow-sm p-3 mb-5 rounded");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-toggle", "tooltip");
            gifImage.attr("data-placement", "top");
            gifImage.attr("title", "Click to Animate/Pause!")
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $("#topics-view").prepend(gifDiv);
        }
        $(document).on("click", ".gif", function(){
            var state = $(this).attr("data-state")
            var clickedGif = $(this);
            var animate = $(this).attr("data-animate")
            var still = $(this).attr("data-still")
            if (state == "still"){
                clickedGif.attr("src", animate)
                clickedGif.attr("data-state", "animated")
                // ClickedGif.attr("data-toggle", "tooltip");
                // ClickedGif.attr("data-placement", "top");
                // ClickedGif.attr("title", "Click to Animate!")
              }
              else if (state == "animated"){
                clickedGif.attr("src", still)
                clickedGif.attr("data-state", "still")
                // ClickedGif.attr("data-toggle", "tooltip");
                // ClickedGif.attr("data-placement", "top");
                // ClickedGif.attr("title", "Click to Pause!")
              }
        })
    });

}
function renderButtons() {
       
    // Deletes the topics prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generates buttons for each topic in the array
      var a = $("<button>");
      // Adds a class of topic to our button
      a.addClass("topic btn btn-info");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
}


$(document).ready(function(){
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
    });
renderButtons();
$(document).on("click", ".topic", displayTopicInfo);
});

    // renderButtons(); 

  

  




