import React, { useState, useEffect } from "react";
import "./weather.css";

export default function WeatherCard({ info }) {
  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    console.log("info recibida para card");
    if (info) {
      setWeatherInfo(info);
    }
  }, [info]);

  return (
    <div className="weather-card">
      {weatherInfo != undefined && (
        <>
          <p className="city">{weatherInfo.location.name}</p>
          <p className="temperature">{weatherInfo.current.temp_c}° C</p>
          <p className="feels-like">Feels like: {weatherInfo.current.feelslike_c}° C</p>
          <img className="icon" src={weatherInfo.current.condition.icon} alt="condition"></img> 
          <p className="description">{weatherInfo.current.condition.text}</p>
        </>
      )}
    </div>
  );
}
