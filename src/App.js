import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";
import moment from "moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState();

  const handleWeatherData = (data) => { // Is called when a new city has been searched or a day was selected from city previously searched
    setWeatherInfo(data);
  };

  const handleWeatherSelected = (data) => { // Stores weather information
    const x = weatherInfo;
    setWeatherInfo({
      city: x.city,
      country: x.country,
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
    });
  };

  return (
    <div className="App">
      <Search data={handleWeatherData} />
      <hr />
      {weatherInfo !== undefined && (
        <>
          <CurrentCard info={weatherInfo} />
          <ForecastCard info={weatherInfo} setData={handleWeatherSelected} />
        </>
      )}
    </div>
  );
}

export default App;
