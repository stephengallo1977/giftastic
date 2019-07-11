// Make an array of cars
var cars = ["Bentley", "Maserati", "Mercedes Benz", "BMW", "Porsche"];

function displayCarGif() {
  console.log($(this));
  var car = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=RrrKaUo2T0gM8hmOhvYEAN3JtnPf61Uf&limit=10";

  // Make an AJAX call for the specific car button being clicked on
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);

    $("#gifs-view").empty();

    for (var i = 0; i < response.data.length; i++) {

      // Create a div here to hold the car
      var carDiv = $("<div class='car'>");

      // Store the rating data
      var rating = response.data[i].rating;

      // Make an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Display the rating
      carDiv.append(pOne);

      // Retrieve the URL for the image
      var imgURL = response.data[i].images.fixed_height_still.url;

      // Make an element to hold the image
      var image = $("<img>").attr({
        "src": imgURL,
        "data-still": imgURL,
        "data-animate": response.data[i].images.fixed_height.url,
        "data-state": "still",
        "class": "animateImg"
      });

      // Append the image
      carDiv.append(image);

      // Prepend the gifs
      $("#gifs-view").prepend(carDiv);

    }
  });
}

// Make a function that handles when a Gif is clicked
$(document).on("click", ".animateImg", function () {

  var state = $(this).attr("data-state");

  // Logic that updates the state of the Gif that is clicked
  if (state === "still") {

    $(this).attr({
      "src": $(this).attr("data-animate"),
      "data-state": "animate"
    });
  } else {

    $(this).attr({
      "src": $(this).attr("data-still"),
      "data-state": "still"
    });
  }
});

// Make a function for displaying the car data
function renderButtons() {

  // Delete the car buttons prior to adding new car buttons
  $("#cars-view").empty();

  // Loop through the array of cars
  for (var i = 0; i < cars.length; i++) {

    // Dynamicaly generate buttons for each car in the array.
    var a = $("<button>");

    // Add a class
    a.addClass("car-btn");

    // Add a data-attribute with a value of the car at index i
    a.attr("data-name", cars[i]);

    // Provide the button's text with a value of the movie at index i
    a.text(cars[i]);

    // Add the button to the HTML
    $("#cars-view").append(a);
  }
}

// Make a  function That handles events when one button is clicked
$("#add-car").on("click", function (event) {

  // Prevent the form from trying to submit itself.
  event.preventDefault();

  // Grab the text from the input box
  var car = $("#car-input").val().trim();

  // The car from the textbox is then added to our array
  cars.push(car);

  // Call renderButtons which handles the processing of our cars array
  renderButtons();
});

// Add a click event listener to all elements with a class of "car-btn"
$(document).on("click", ".car-btn", displayCarGif);

// Call the renderButtons function at least once to display the initial list of animals
renderButtons();