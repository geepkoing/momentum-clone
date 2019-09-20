const weather = document.querySelector(".js-weather");
const current = weather.querySelector(".weather__current");
const place = weather.querySelector(".weather__place");

const COORDS_LS = "coords";
const API_KEYS = "afa9165eb65a9a797188b3dae21de5ea";

function getIcon(json) {
  const iconCode = json.weather[0].icon;
  const icon = new Image();
  icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return icon;
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temp = `${json.main.temp}°C`;
      const icon = getIcon(json);
      const span = document.createElement("span");
      span.innerText = temp;
      current.appendChild(icon);
      current.appendChild(span);
      place.innerText = json.name;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  const coordsObj = {
    longitude,
    latitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
