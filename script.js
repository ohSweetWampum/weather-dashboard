
// //need to make a search bar on the left hand side (aside) of site with a search button and a space below for previous searchs to appear as buttons that you can click on to see there info, presumably alot of this can be done with bootstrap. need a header that says weatehr dashboard, need current day weather below that, need 5 day below that. Need to store user input to local storage and be able to retrieve it.
// //need to use geocoding api, then link that up with the 5 day/3 hour forecast api


//Search button search functionality, call api, return current and 5 day forecast

var searchInputBox = document.getElementById("searchBox");
searchInputBox.addEventListener("submit", function(event) {
  event.preventDefault();
  
  var cityInput = document.getElementById("inputCityName").value;
  var apiKey = "2e7ad0266ed734e297938c3bcc22afc5";
  var apiURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;
  var currentTemp = document.getElementById("current-temp");
  var currentDayConditions = document.getElementById("current-day-conditions");
  var currentDayHigh = document.getElementById("current-day-high");
  var currentDayLow = document.getElementById("current-day-low");
  var currentDayWind = document.getElementById("current-day-wind");
  fetch(apiURLCurrentWeather)
    .then(response => response.json())
    .then(data => {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var apiURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
      currentTemp.textContent = "Temperature: " + data.main.temp + "°F";
      currentDayHigh.textContent = "High: " + data.main.temp_max + "°F";
      currentDayLow.textContent = "Low: " + data.main.temp_min + "°F";
      currentDayWind.textContent = "Wind Speed: " + data.wind.speed + " mph";

      // Update city name and current date
      var cityName = data.name;
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var cityTitle = document.getElementById("city-title");
      var iconCode = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
      cityTitle.innerHTML =   cityName + '<img src="' + iconUrl + '">' + currentDate;
      
      
      


      renderRecentlySearchedButtons(cityInput);

      fetch(apiURLFiveDay)
        .then(response => response.json())
        .then(data => {
          
          
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
    
});






  // Function for rendering recently searched location buttons
  function renderRecentlySearchedButtons(cityInput) {
    var cityButtonContainer = document.getElementById("recent-cities-buttons-container");
  
    // check if city has already been searched
    var isDuplicate = false;
    var buttons = cityButtonContainer.querySelectorAll('button');
    buttons.forEach(function(button) {
      if (button.textContent === cityInput) {
        isDuplicate = true;
      }
    });
  
    // adds new button if it's not a duplicate and if the max limit has not been reached
    if (!isDuplicate) {
      var cityButton = document.createElement("button");
      cityButton.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2');
      cityButton.textContent = cityInput;
      cityButtonContainer.appendChild(cityButton);
  
      // removes oldest button if max limit of 6 is reached
      if (buttons.length >= 6) {
        cityButtonContainer.removeChild(buttons[0]);
      }
    }
  }
  


   







































