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
let currentMinutes = date.getMinutes();

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = `${currentDay} ${currentMonth} ${currentDate}`;

//show current temperature
function displayTemperature(response) {
  let todayTemperature = document.querySelector("#temperature");
  todayTemperature.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = response.data.wind.speed;
  let currentConditions = document.querySelector("#current-conditions");
  currentConditions.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let precip = document.querySelector("#precipitation");
  precip.innerHTML = response.data.main.console.log(response.data);
}

let apiKey = "a0e67f987d2d40d852b573db0574da90";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
