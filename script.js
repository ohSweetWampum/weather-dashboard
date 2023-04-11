// wrapped entire code in this so now it waits for DOM to load before executing JavaScript code
document.addEventListener("DOMContentLoaded", function(event) {

  // Retrieving recently searched cities from local storage, to display and then displaying them as buttons
  var recentlySearched = JSON.parse(localStorage.getItem('recentlySearched')) || [];
  recentlySearched.forEach(function(cityInput) {
      renderRecentlySearchedButtons(cityInput);
  });

  // Function for searching for city weather data and setting my open weather map API key and the URLs with appropiate queries
  function searchCity(cityInput) {
      var apiKey = "2e7ad0266ed734e297938c3bcc22afc5";
      var apiURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;

      // getting references to HTML elements where weather data will be displayed for the current day
      var currentTemp = document.getElementById("current-temp");
      var currentDayHigh = document.getElementById("current-day-high");
      var currentDayLow = document.getElementById("current-day-low");
      var currentDayWind = document.getElementById("current-day-wind");
      var currentDayHumidity = document.getElementById("current-day-humidity");

      // fetching current weather data from open weather map  API
      fetch(apiURLCurrentWeather)
          .then(response => response.json())
          .then(data => {
              // getting latitude and longitude from the current weather data api
              var lat = data.coord.lat;
              var lon = data.coord.lon;
              var apiURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

              // updating the HTML elements with current weather data and displaying them
              currentTemp.textContent = "Temperature: " + data.main.temp + "°F";
              currentDayHigh.textContent = "High: " + data.main.temp_max + "°F";
              currentDayLow.textContent = "Low: " + data.main.temp_min + "°F";
              currentDayWind.textContent = "Wind Speed: " + data.wind.speed + " mph";
              currentDayHumidity.textContent = "Humidity: " + data.main.humidity + "%";


              // getting city name and current date, and conditions icon then updating title with them
              var cityName = data.name;
              var currentDate = dayjs().format('dddd, MMMM D, YYYY');
              var cityTitle = document.getElementById("city-title");
              var iconCode = data.weather[0].icon;
              var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
              cityTitle.innerHTML = cityName + '<img src="' + iconUrl + '">' + currentDate;


              renderRecentlySearchedButtons(cityInput);

              // fetch five-day forecast data from open weather app API and display it
              fetch(apiURLFiveDay)
                  .then(response => response.json())
                  .then(data => {
                      displayFiveDayForecast(data);
                  })
                  .catch(error => console.error(error));
          });
  }
  // getting reference top the search input box html element and adding a submit event listener to it
  var searchInputBox = document.getElementById("searchBox");
  searchInputBox.addEventListener("submit", function(event) {
      event.preventDefault();
      var cityInput = document.getElementById("inputCityName").value;
      searchCity(cityInput);
  });

  // added a click event listener to the container for recently searched cities
  document.getElementById("recent-cities-buttons-container").addEventListener("click", function(event) {
      if (event.target.tagName === "BUTTON") {
          var cityInput = event.target.textContent;
          searchCity(cityInput);
      }
  });


  // Function for rendering recently searched location buttons
  function renderRecentlySearchedButtons(cityInput) {
      var cityButtonContainer = document.getElementById("recent-cities-buttons-container");

      // checking if city has already been searched and if it is already displayed as a button
      var isDuplicate = false;
      var buttons = cityButtonContainer.querySelectorAll('button');
      buttons.forEach(function(button) {
          if (button.textContent.toLowerCase() === cityInput.toLowerCase()) {
              isDuplicate = true;
          }
      });

      // if the city has not been searched before or is not already displayed as a button
      if (!isDuplicate) {


          var cityButton = document.createElement("button");
          cityButton.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2', 'w-100');
          cityButton.textContent = cityInput;


          cityButtonContainer.appendChild(cityButton);


          if (buttons.length >= 6) {
              cityButtonContainer.removeChild(buttons[0]);
          }

          // save the recently searched city to local storage
          var recentlySearched = JSON.parse(localStorage.getItem('recentlySearched')) || [];
          recentlySearched.push(cityInput);
          localStorage.setItem('recentlySearched', JSON.stringify(recentlySearched));
      }
  }

  //display 5-day forecat function
  function displayFiveDayForecast(data) {
    var forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";
  
    // group forecasts by date
    var forecastsByDate = {};
    data.list.forEach(function(forecast) {
      var date = forecast.dt_txt.split(' ')[0];
      if (!forecastsByDate[date]) {
        forecastsByDate[date] = [];
      }
      forecastsByDate[date].push(forecast);
    });
  
    // display high and low temperatures for each day
    var counter = 0;
    Object.keys(forecastsByDate).forEach(function(date) {
      if (counter >= 5) {
        return;
      }
  
      var forecastsForDate = forecastsByDate[date];
  
      var highTemp = Math.max(...forecastsForDate.map(function(item) {
        return item.main.temp_max;
      }));
  
      var lowTemp = Math.min(...forecastsForDate.map(function(item) {
        return item.main.temp_min;
      }));
  
      var iconCode = forecastsForDate[0].weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
      var forecastDate = dayjs(forecastsForDate[0].dt_txt).format("dddd, MMMM D");
  
      var card = document.createElement("div");
      card.classList.add("col");
      card.innerHTML = '<div class="card border-dark bg-white"><div class="card-body">' +
        '<h5 class="card-title">' + forecastDate + '</h5>' +
        '<img src="' + iconUrl + '">' +
        '<p class="card-text">High: ' + highTemp + '°F</p>' +
        '<p class="card-text">Low: ' + lowTemp + '°F</p>' +
        '<p class="card-text">Wind: ' + forecastsForDate[0].wind.speed + ' mph</p>' +
        '<p class="card-text">Humidity: ' + forecastsForDate[0].main.humidity + '%</p>' +
        '</div></div>';
  
      forecastContainer.appendChild(card);
      counter++;
    });
  }
  
  


});

