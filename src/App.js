import React, { useState, useCallback} from "react";
import "./App.css";
import Search from "./components/Search";
import ForecastCard from "./components/ForecastCard";
import weatherBc from "./images/weather-background.png";

function App() {
  const [weatherInfo, setWeatherInfo] = useState();

  const handleWeatherData = useCallback((data) => { // Called when a new city was searched or another day was selected
    setWeatherInfo(data);
  }, []);

  return (
    <div className="App">
      <hr/>
      <Search data={handleWeatherData} />
      <hr />
      {weatherInfo !== undefined ? (
          <ForecastCard info={weatherInfo}/>
      ):(
        <img src={weatherBc} alt="condition" className="weather-background"></img>
      )}
    </div>
  );
}

export default App;
