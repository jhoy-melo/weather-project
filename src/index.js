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

function search(city) {
  let apiKey = "d845093c0eaa197bbff6962d62d10bc4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(`${apiUrl}`).then(showData);

}


function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}

search("São Paulo");

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response){
let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index >= 1 && index <= 6) {
    forecastHTML = forecastHTML + `
    <div class="col-2 temp-day">
    <div class="card little-cards">
        <div class="card-body">
          <img 
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
          alt="clear" 
          id="icon-forecast"
          />
          <div class="temparatureHL">H: <span id="tempNextDaysHigh">${Math.round(forecastDay.temp.max)}°C</span> | L: <span id="tempNextDaysLow">${Math.round(forecastDay.temp.min)}°C</span> </div>
          <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>    
    </div>
      </div>
      </div>
  `;
}
  });
  
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

function getForecast(coordinates) {
  let apiKey = "d845093c0eaa197bbff6962d62d10bc4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showData(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentSky = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = wind * 3.6;
  let currentTempMax = Math.round(response.data.main.temp_max);
  let currentTempMin = Math.round(response.data.main.temp_min);
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  celciusTemp = currentTemperature;
  let iconElement = document.querySelector("#icon");

  showCity(response.data.name);

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
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].main);

getForecast(response.data.coord);

}

function showCity(cityName) {
  let city = document.querySelector("#city");
  city.innerHTML = cityName;
}

let currentTemp = document.querySelector("#temperature");

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
