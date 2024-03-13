import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [sky, setSky] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  function showData(response) {
    setTemperature(response.data.main.temp);
    setSky(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(url).then(showData);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  return (
    <div class="container weather-wrapper">
      <form onSubmit={handleSubmit}>
        <input class="weather-input" type="search" onChange={updateCity} />
        <input class="button" type="submit" value="Search" />
      </form>
      {temperature && (
        <ul>
          <li>Temperature: {Math.round(temperature)}°C </li>
          <li>Description: {sky}</li>

          <li>Humidity: {Math.round(humidity)}% </li>
          <li>Wind: {Math.round(wind)}km/h</li>

          <li>
            Icon:
            {
              <img
                class="main-icon"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
              />
            }
          </li>
        </ul>
      )}
    </div>
  );
}
