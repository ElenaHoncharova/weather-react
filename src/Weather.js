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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      {temperature && (
        <p>
          Temperature: {Math.round(temperature)}°C <br />
          Description: {sky}
          <br />
          Humidity: {Math.round(humidity)}% <br />
          Wind: {Math.round(wind)}km/h
          <br />
          Icon:
          {
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=""
            />
          }
        </p>
      )}
    </div>
  );
}
