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
  function formatDate(date) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return date.toLocaleString(undefined, options);
}
function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

const DateDisplay = ({ timestamp }) => {
    const date = new Date(timestamp * 1000);
    return (
        <div>
            <p>Formatted Date: {formatDate(date)}</p>
            <p>Day of the Week: {formatDay(timestamp)}</p>
        </div>
    );
};

  function showData(response) {
    console.log(response);
    setData(response.data);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
<div className="Weather">
  <div className="grid d-flex align-items-center">
    <form onSubmit={handleSubmit} className="d-flex w-100">
      <input
        className="col-8 p-2"
        type="search"
        onChange={updateCity}
        placeholder="Please enter a city..."
      />
      <input className="col-4 p-2 ms-2" type="submit" value="Search" />
    </form>
  </div>
  <div className="weather details grid d-flex">
    <div className="row w-100">
    <h1 className="col-6">{city}</h1>
    <h2 className="col-6"> <img src={data.condition.icon_url} alt="" />
    {Math.round(data.temperature.current)}°C</h2>
    </div>
</div>

<div className="grid">
<div className="row w-100">
    <p className="col-6">{DateDisplay},{data.condition.description}</p>
</div>
<div className="row w-100">
    <p className="col-6"> 
        Humidity: {data.temperature.humidity}%
        Wind: {data.wind.speed}km/h</p>
        </div>
  </div>

    </div>
  );
}