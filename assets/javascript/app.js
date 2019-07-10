// Make array of cars
var cars = ["Bentley", "Maserati", "Mercedes Benz", "BMW", "Porsche"];

function displayCarGif() {
  console.log($(this));
  var car = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=RrrKaUo2T0gM8hmOhvYEAN3JtnPf61Uf&limit=10";

  // Make an AJAX call for the specific car button being clicked on
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    $("#gifs-view").empty();

    for (var i = 0; i < response.data.length; i++) {

      // Create a div here to hold the car
      var carDiv = $("<div class='car'>");

      // Store the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      carDiv.append(pOne);

      // Retrieve the URL for the image
      var imgURL = response.data[i].images.fixed_height_still.url;

      // Creating an element to hold the image
      var image = $("<img>").attr({"src":imgURL, "data-still":imgURL, "data-animate":response.data[i].images.fixed_height.url, "data-state":"still", "class":"animateImg"});

      // Appending the image
      carDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#gifs-view").prepend(carDiv);

    }
  });
}

// Function handling when a Gif is clicked
$(document).on("click", ".animateImg", function() {

      var state = $(this).attr("data-state");

      // Logic that updates the state of the Gif that is clicked
      if (state === "still") {

        $(this).attr({"src":$(this).attr("data-animate"), "data-state":"animate"});
      }
      else {

        $(this).attr({"src":$(this).attr("data-still"), "data-state":"still"});
      }
    });

// Function for displaying car data
function renderButtons() {

    // Deleting the car buttons prior to adding new animal buttons
    $("#cars-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < cars.length; i++) {

      // Then dynamicaly generating buttons for each car in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("car-btn");
      // Adding a data-attribute with a value of the car at index i
      a.attr("data-name", cars[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(cars[i]);
      // Adding the button to the HTML
      $("#cars-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-car").on("click", function(event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // This grabs the text from the input box
  var car = $("#car-input").val().trim();
  // The car from the textbox is then added to our array
  cars.push(car);

  // calling renderButtons which handles the processing of our cars array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "car-btn"
$(document).on("click", ".car-btn", displayCarGif);

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();