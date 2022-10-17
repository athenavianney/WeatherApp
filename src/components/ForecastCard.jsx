import React, { useState, useEffect } from "react";
import "./weather.css";
import moment from "moment/moment";
import ForecastByHour from "./ForecastByHour";
import CurrentCard from "./CurrentCard";

export default function ForecastCard({ info }) { //Shows forecast for the following 5-days
  const [weatherInfo, setWeatherInfo] = useState();
  const [index, setIndex] = useState(0); // Stores which day is pressed

  useEffect(() => {
    if (info) {
      setWeatherInfo(info);
      setIndex(0);
    }
  }, [info]);

  const getDayName = (dateStr) => { // Returns short for week day
    if(moment(dateStr).format("MMM Do YY") === moment(new Date()).format("MMM Do YY"))
      return "Today";
    return moment(dateStr).format("dddd");
  };

  const buttonFunction = (e, date, index) => {
    setIndex(index);
    handleWeatherSelected(date);
  };

  const handleWeatherSelected = (data) => { // Stores weather information
    const x = weatherInfo;
    setWeatherInfo({
      city: x.city,
      country: x.country,
      region: x.region,
      date: moment(data.date).format(),
      icon: data.day.condition.icon, 
      currentIcon: x.currentIcon,
      condition: data.day.condition.text,
      currentCondition: x.currentCondition,
      temp: data.day.avgtemp_c,
      currentTemp: x.currentTemp,
      feelsLike: x.feelsLike, 
      maxTemp: data.day.maxtemp_c, 
      minTemp: data.day.mintemp_c, 
      wind: x.wind, 
      windDir: x.windDir,
      forecast: x.forecast,
      hours: data.hour,
      timezone: x.timezone
    });
  };

  return (
    <div>
      {weatherInfo !== undefined && (
        <>
          <CurrentCard info={weatherInfo} />
          <ForecastByHour data={weatherInfo.hours} />
          <div className="forecast-card">
            <p className="title-2">5-day forecast</p>
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
        </>
      )}
    </div>
  );
}
