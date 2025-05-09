import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [data, setData] = useState({});
  let [city, setCity] = useState("");
  let apiKey = "594b61tf99f8e42c306162ocb32f8ac6";

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(url).then(showData);
  }


  function formatDate(date) {
      const options = {
          hour: "numeric",
          minute: "numeric",
      };
      return date.toLocaleString(undefined, options);
  }
  
  function formatDay(timestamp) {
      let date = new Date(timestamp * 1000);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[date.getDay()];
  }
  
  const DateDisplay = ({ timestamp }) => {
      const date = new Date(timestamp * 1000);
      return (
          <div>
              <p>Day of the Week: {formatDay(timestamp)}</p>
              <p>Time: {formatDate(date)}</p>
          </div>
      );
  };


  function showData(response) {
   
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
  <div className="weather details grid">
    <div className="row w-100">
    <h1 className="col-6">{city}</h1>
    <h2 className="col-6"> 
    {data.temperature ? Math.round(data.temperature.current) + "°C" : "N/A"}</h2>
    </div>
</div>


<div className="grid">
<div className="row w-100">
<p className="col-6">
                    <DateDisplay timestamp={data.time} /> 
                    {data.condition ? data.condition.description : "No data"}
                </p>
</div>
<div className="row w-100">
    <p className="col-6"> 
    {data.temperature ? "Humidity: " + data.temperature.humidity + "%" : "N/A"} {""}
    {data.wind ? "Wind: " + data.wind.speed + "km/h " : "N/A"}</p>
        </div>
  </div>

 

    </div>
    
  );
}