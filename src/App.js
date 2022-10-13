import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";

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
      date: new Date(data.date),
      icon: data.day.condition.icon, 
      condition: data.day.condition.text,
      temp: data.day.avgtemp_c,
      currentTemp: x.currentTemp,
      feelsLike: x.feelsLike, 
      maxTemp: data.day.maxtemp_c, 
      minTemp: data.day.mintemp_c, 
      wind: x.wind, 
      windDir: x.windDir,
      forecast: x.forecast
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
