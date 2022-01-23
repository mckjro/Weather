//show date
let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();
let currentHours = date.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = `${currentDay} ${currentMonth} ${currentDate} ${currentHours}:${currentMinutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//display forecast for rest of week
function displayForecast(response) {
  let forecast = response.data.daily;
  let weeklyForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <div class="forecast-icon">
          <img
           src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
            alt=""
            width="70"
          />
        </div>
        <div class="forecast-temperature">
          <span class="forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weeklyForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a0e67f987d2d40d852b573db0574da90";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

//show current temperature
function displayTemperature(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let todayTemperature = document.querySelector("#temperature");
  todayTemperature.innerHTML = Math.round(response.data.main.temp);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let currentConditions = document.querySelector("#current-conditions");
  currentConditions.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//submit city
function searchCity(city) {
  let apiKey = "a0e67f987d2d40d852b573db0574da90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  searchCity(cityInput.value);
}

searchCity("New York");

let form = document.querySelector("#city-form");
form.addEventListener("submit", submitCity);

//current location
function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "a0e67f987d2d40d852b573db0574da90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function currentTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let makeCurrentCity = document.querySelector("#city");
  let makeCurrentTemp = document.querySelector("#temperature");
  makeCurrentCity.innerHTML = `${currentCity}`;
  makeCurrentTemp.innerHTML = `${currentTemp}`;
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", findLocation);

function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsiusTemp = temperature.innerHTML;
  celsiusTemp = Number(celsiusTemp);
  temperature.innerHTML = Math.round(((celsiusTemp - 32) * 5) / 9);
}

let changeCelsius = document.querySelector("#celsius-link");
changeCelsius.addEventListener("click", celsius);

function farenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let farenheitTemp = temperature.innerHTML;
  farenheitTemp = Number(farenheitTemp);
  temperature.innerHTML = Math.round((farenheitTemp * 9) / 5 + 32);
}

let changeFarenheit = document.querySelector("#farenheit-link");
changeFarenheit.addEventListener("click", farenheit);
