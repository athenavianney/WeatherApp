import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";
import moment from "moment";
import ForecastByHour from "./components/ForecastByHour";

function App() {
  const [weatherInfo, setWeatherInfo] = useState();

  const handleWeatherData = (data) => { // Is called when a new city has been searched or a day was selected from city previously searched
    setWeatherInfo(data);
  };

  return (
    <div className="App">
      <Search data={handleWeatherData} />
      <hr />
      {weatherInfo !== undefined && (
          <ForecastCard info={weatherInfo}/>
      )}
    </div>
  );
}

export default App;
