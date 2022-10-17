import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";
import moment from "moment";
import ForecastByHour from "./components/ForecastByHour";

function App() {
  const [weatherInfo, setWeatherInfo] = useState();

  const handleWeatherData = (data) => { // Called when a new city was searched or a day was selected
    setWeatherInfo(data);
  };

  return (
    <div className="App">
      <hr/>
      <Search data={handleWeatherData} />
      <hr />
      {weatherInfo !== undefined && (
          <ForecastCard info={weatherInfo}/>
      )}
    </div>
  );
}

export default App;
