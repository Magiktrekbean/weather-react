import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [data, setData] = useState(null);
  let [city, setCity] = useState("");
  let apiKey = "594b61tf99f8e42c306162ocb32f8ac6";

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(url).then(showData);
  }

  function showData(response) {
    console.log(response);
    setData(response.data);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={updateCity}
          placeholder="Please enter a city..."
        ></input>
        <input type="submit" value="search"></input>
      </form>{" "}
      <div>
        {data ? (
          <ul>
            <li>Temperature: {Math.round(data.temperature.current)}°C</li>
            <li>Description: {data.condition.description} </li>
            <li>Humidity: {data.temperature.humidity}%</li>
            <li>Wind: {data.wind.speed}km/h</li>
            <li>
              <img src={data.condition.icon_url} alt="" />
            </li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}