import React, { useState, useEffect } from "react";
import "./weather.css";
import moment from "moment/moment";

export default function CurrentCard({ info }) {
  //shows the current forecast
  const [weatherInfo, setWeatherInfo] = useState();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [currentDate, setCurrentDate] = useState(true);

  useEffect(() => {
    if (info) {
      if (moment(info.date).format("MMM Do YY") === moment(new Date()).format("MMM Do YY")) {
        //current day same as day selected
        setCurrentDate(true);
        info.temp = info.currentTemp;
        info.icon = info.currentIcon;
        info.description = info.currentDescription;
      } else {
        setCurrentDate(false);
      }

      setWeatherInfo(info);

      setDate(moment(info.date).format("MMM Do YY")); //format day
    }
  }, [info]);

  const getTime = () => {
    //gets current time
    const current = moment().format('LTS');
    setTime(current);
  };

  useEffect(() => {
    setInterval(() => getTime(), 1000); //time on screen
  }, []);

  return (
    <div>
      {weatherInfo !== undefined && (
        <div className="current-card">
          <p className="title">{weatherInfo.city}</p>
          <p className="text">{weatherInfo.country}</p>
          <div className="row">
            <div className="column-current">
              <img className="icon-current" style={{ width: "200px" }} src={weatherInfo.icon} alt="condition"></img>
              <p className="text">{weatherInfo.condition}</p>
            </div>
            <div className="column-current">
              <p className="clock">{date}</p>
              <p className="temperature">{weatherInfo.temp} °C</p>
              {currentDate && <p className="clock">{time}</p>}
            </div>
            <div className="column-current">
              {currentDate && <p className="text">Feels like: {weatherInfo.feelsLike} °C</p>}
              <p className="text">Max temp: {weatherInfo.maxTemp} °C</p>
              <p className="text">Min temp: {weatherInfo.minTemp} °C</p>
              {currentDate && (
                <p className="text">
                  Wind: {weatherInfo.wind} km/h {weatherInfo.windDir}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
