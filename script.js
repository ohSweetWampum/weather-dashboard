
// //need to make a search bar on the left hand side (aside) of site with a search button and a space below for previous searchs to appear as buttons that you can click on to see there info, presumably alot of this can be done with bootstrap. need a header that says weatehr dashboard, need current day weather below that, need 5 day below that. Need to store user input to local storage and be able to retrieve it.
// //need to use geocoding api, then link that up with the 5 day/3 hour forecast api


//Search button search functionality, call api, return current and 5 day forecast
var searchButton = document.getElementById("search-city");

searchButton.addEventListener("submit", function(event) {
  event.preventDefault();
  
  var cityInput = document.getElementById("inputCityName").value;
  var apiKey = "2e7ad0266ed734e297938c3bcc22afc5";
  var apiURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;
  
  fetch(apiURLCurrentWeather)
    .then(response => response.json())
    .then(data => {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var apiURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

      fetch(apiURLFiveDay)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
    console.log(data.list);
});






  // Function for rendering recently searched location buttons
  function renderRecentlySearchedButtons() {
    var 

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

   









































