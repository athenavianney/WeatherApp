import React, { useState, useEffect } from "react";
import "./weather.css";

export default function ForecastCard({ info, setData }) { //shows the forecast for the following 5 days
  const [weatherInfo, setWeatherInfo] = useState();
  const [index, setIndex] = useState(0); //Stores which button is pressed

  useEffect(() => {
    if (info) {
      setWeatherInfo(info); 
    }
  }, [info]);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr).toString();
    return date.slice(0,3);
  };

  const buttonFunction = (e, info, i) =>{
    setIndex(i);
    setData(info);
  }

  return (
    <div>
      {weatherInfo !== undefined && (
        <div className="forecast-card">
          <div className="row">
            {weatherInfo.forecast.map((day, i) => (
              <button type="button" className={index === i ? "button-forecast-active" : "button-forecast"} onClick={(e) => buttonFunction(e, day, i)} key={i} id={i}>
                <p className="text">{getDayName(day.date)}</p>
                <img className="icon" src={day.day.condition.icon} alt="condition"></img>
                <p className="text">{day.day.avgtemp_c} °C</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
