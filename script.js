
var recentlySearched = JSON.parse(localStorage.getItem('recentlySearched')) || [];
recentlySearched.forEach(function(cityInput) {
  renderRecentlySearchedButtons(cityInput);
});

function searchCity(cityInput) {
  var apiKey = "2e7ad0266ed734e297938c3bcc22afc5";
  var apiURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;

  var currentTemp = document.getElementById("current-temp");
  var currentDayConditions = document.querySelector("conditions-icon");
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

     
      var currentDayHumidity = document.getElementById("current-day-humidity");
      currentDayHumidity.textContent = "Humidity: " + data.main.humidity + "%";

     
      var cityName = data.name;
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var cityTitle = document.getElementById("city-title");
      var iconCode = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
      cityTitle.innerHTML = cityName + '<img src="' + iconUrl + '">' + currentDate;

      renderRecentlySearchedButtons(cityInput);

      fetch(apiURLFiveDay)
        .then(response => response.json())
        .then(data => {
          displayFiveDayForecast(data);
        })
        .catch(error => console.error(error));
    });
}

var searchInputBox = document.getElementById("searchBox");
searchInputBox.addEventListener("submit", function(event) {
  event.preventDefault();

  var cityInput = document.getElementById("inputCityName").value;
  searchCity(cityInput);
});
document.getElementById("recent-cities-buttons-container").addEventListener("click", function(event) {


  if (event.target.tagName === "BUTTON") {
    var cityInput = event.target.textContent;
    searchCity(cityInput);
  }
});


function renderRecentlySearchedButtons(cityInput) {
  var cityButtonContainer = document.getElementById("recent-cities-buttons-container");

  
  var isDuplicate = false;
  var buttons = cityButtonContainer.querySelectorAll('button');
  buttons.forEach(function(button) {
    if (button.textContent === cityInput) {
      isDuplicate = true;
    }
  });

 
  if (!isDuplicate) {
    var cityButton = document.createElement("button");
    cityButton.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2');
    cityButton.textContent = cityInput;
    cityButtonContainer.appendChild(cityButton);

    
    if (buttons.length >= 6) {
      cityButtonContainer.removeChild(buttons[0]);
    }
    
    var recentlySearched = JSON.parse(localStorage.getItem('recentlySearched')) || [];
    recentlySearched.push(cityInput);
    localStorage.setItem('recentlySearched', JSON.stringify(recentlySearched));
  }
}

function displayFiveDayForecast(data) {
  var forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = ""; 

  for (var i = 0; i < data.list.length; i += 8) {
    var forecast = data.list[i];
    var forecastDate = dayjs(forecast.dt_txt).format("dddd, MMMM D");
    var iconCode = forecast.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

    var card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = '<div class="card border-dark bg-white"><div class="card-body">' +
      '<h5 class="card-title">' + forecastDate + '</h5>' +
      '<img src="' + iconUrl + '">' +
      '<p class="card-text">High: ' + forecast.main.temp_max + '°F</p>' +
      '<p class="card-text">Low: ' + forecast.main.temp_min + '°F</p>' +
      '<p class="card-text">Wind: ' + forecast.wind.speed + ' mph</p>' +
      '<p class="card-text">Humidity: ' + forecast.main.humidity + '%</p>' +

      '</div></div>';

    forecastContainer.appendChild(card);
  }
}




































