//Getting live hours and date

//Converting metric
let celciusTemp = 0;
let fahrenTemp = 0;


let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
if (hours < 10) hours = `0${hours}`;
if (minutes < 10) minutes = `0${minutes}`;

let li = document.querySelector("#weekDay");
weekDay.innerHTML = `${day} | `;

let liveHour = document.querySelector("#liveHour");
liveHour.innerHTML = `${hours}:${minutes}`;

let liveHours = document.querySelector("#liveHours");
//liveHours.innerHTML = `${hours}:${minutes}`;
liveHours.innerHTML = hours + ":" + minutes;

let liveDates = document.querySelector("#liveDate");
if (date < 10) date = `0${date}`;
liveDates.innerHTML = `${date}/${month}/${year}`;


//Getting typed location
//let searchForm = document.querySelector("#city-Search");

function searchCity(event) {

let cityInput = document.querySelector("#location");

let apiKey = "d845093c0eaa197bbff6962d62d10bc4";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

axios.get(`${apiUrl}`).then(showData);

  event.preventDefault();
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", searchCity);
//console.log(searchForm);

function showData(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let currentSky = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = wind * 3.6;
  let currentTempMax = Math.round(response.data.main.temp_max);
  let currentTempMin = Math.round(response.data.main.temp_min);
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  celciusTemp = currentTemperature;
  fahrenTemp = (celciusTemp * 9) / 5 + 32;

  showCity(response.data.name);

  //let feelsLikeTemp = currentFeelsLike;
  //let celsiusMaxTemp = currentTempMax;
  //let celsiusMinTemp = currentTempMin;

  let feelsLike = document.querySelector("#feels-like");
  let maxTemp = document.querySelector("#max");
  let minTemp = document.querySelector("#min");
  let temperature = document.querySelector("#temperature");
  let skySituation = document.querySelector("#sky");
  let windSituation = document.querySelector("#wind")

  feelsLike.innerHTML = `${currentFeelsLike}`;
  maxTemp.innerHTML = `${currentTempMax}`;
  minTemp.innerHTML = `${currentTempMin}`;
  windSituation.innerHTML = `${currentWind}`;
  skySituation.innerHTML = `${currentSky}`;
  temperature.innerHTML = `${currentTemperature}`;

}

function showCity(cityName) {
  
  let city = document.querySelector("#city");
  city.innerHTML = cityName;
}

let tempCelsius = document.querySelector("#celsius-link");
let tempFahrenheit = document.querySelector("#fahrenheit-link");
let currentTemp = document.querySelector("#temperature");

function getFahren(event) {
  event.preventDefault();
  currentTemp.innerHTML = `${Math.round(fahrenTemp)}`;
  tempFahrenheit.classList.add("disabled");
  tempCelsius.classList.remove("disabled");
}

function getCelcius(event) {
  event.preventDefault();
  currentTemp.innerHTML = `${Math.round(celciusTemp)}`;
  tempCelsius.classList.add("disabled");
  tempFahrenheit.classList.remove("disabled");
}

tempFahrenheit.addEventListener("click", getFahren);
tempCelsius.addEventListener("click", getCelcius);


function getCurrentPosition (position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = "d845093c0eaa197bbff6962d62d10bc4";
let units = "metric";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
let urlCurrent = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

axios.get(urlCurrent).then(showData);
}

function retrievePosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
  }

let buttonClick = document.querySelector("#current")
buttonClick.addEventListener("click", retrievePosition);


