function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "a0e67f987d2d40d852b573db0574da90";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
