
// //need to make a search bar on the left hand side (aside) of site with a search button and a space below for previous searchs to appear as buttons that you can click on to see there info, presumably alot of this can be done with bootstrap. need a header that says weatehr dashboard, need current day weather below that, need 5 day below that. Need to store user input to local storage and be able to retrieve it.
// //need to use geocoding api, then link that up with the 5 day/3 hour forecast api


  // Function for displaying movie data
  function renderSearchHistoryButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#createButton").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var newButton = $("<button>");
      // Adding a class of movie-btn to our button
      newButton.addClass("movie-btn");
      // Adding a data-attribute
      newButton.attr("data-name", movies[i]);
      // Providing the initial button text
      newButton.text(movies[i]);
      // Adding the button to the buttons-view div
      $("#createButton").append(newButton);
    }
  }

  // This function handles events where a movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderSearchHistoryButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".movie-btn", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderSearchHistoryButtons();



  
// //save user input to local storage
function retrieveGeocoordinates(){
  var cityCoordinates = $(this).attr("data-cityCoordinates");
  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={2e7ad0266ed734e297938c3bcc22afc5}"


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#movies-view").empty();

   




// create button for a recent searched city

function displayWeatherInfoForRecentSearch() {
        
  var cityName = $(this).attr("data-cityName");
  var queryURL = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={ 2e7ad0266ed734e297938c3bcc22afc5}

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#movies-view").empty();

    // Creating a div to hold the movie
    // var movieDiv = $("<div class='movie'>");
    var movieDiv = $("<div>");
    movieDiv.attr("class", 'movie');

    console.log(response);
    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var pOne = $("<p>");

    pOne.text("Rating: " + rating);
   
    // Displaying the rating
    movieDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<p>")
    pTwo.text("Released: " + released);

    // Displaying the release year
    movieDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p>")
    pThree.text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

  

    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);
  });

}





























//display current day at top of the page
function displayCurrentDateAtTop() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY h:mm a"));
}

displayCurrentDateAtTop();

//adding event listener so that when the save button is pressed the data is saved to local
$(function () {
  var saveButton = $(".btn.saveBtn.col-2.col-md-1");
  saveButton.click(function () {
    var taskText = $(this).siblings(".description").val();
    var taskTime = $(this).parent().attr("id");

    storeToLocal({
      taskText: taskText,
      taskTime: taskTime,
    });
  });
});

$(function () {
  var currentTime = dayjs();
  var currentHour = currentTime.hour();
  
  // loop through every hour of the day and check to see if that hour is past, present or future of current hour, then add appropriate class to each box
  for (var hour = 0; hour <24 ; hour++) {
    //  if hour is in the past
    if (currentHour > hour) {
      $("#hour-" + hour).addClass("past");
    }
    //  if hour is present time
    else if (currentHour === hour) {
      $("#hour-" + hour).addClass("present");
    }
    //  if hour is in the future
    else {
      $("#hour-" + hour).addClass("future");
    }
  }
});


//save to local storage function
function storeToLocal() {
  $(".saveBtn").on("click", function () {
    var taskText = $(this).siblings(".description").val();
    var taskTime = $(this).siblings(".hour").text();
    localStorage.setItem(taskTime, taskText);
  });
}
//retrieve from local storage, goes through every hour looking for stored data and retrieves it if there. if there is a saved task then it sets the textarea elemnt to the saved value
function retrieveFromLocal() {
  for (var hour = 0; hour < 24; hour++) {
    var taskTime = $("#hour-" + hour + " .hour").text();
    var savedTaskText = localStorage.getItem(taskTime);
    if (savedTaskText !== null) {
      $("#hour-" + hour + " .description").val(savedTaskText);
    }
  }
}

retrieveFromLocal();













