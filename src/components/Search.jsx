import React, { useState, useEffect } from "react";

export default function Search({ data }) { //Search city and returns weather information

  const [cityName, setCityName] = useState(""); // stores city name
  const [weatherData, setWeatherData] = useState(); // stores weather data
  const APIkey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => { // Re-renders once the weather information has been changed/received
    data(weatherData);
  }, [weatherData]);

  const fetchInfo = (city) => { // Gets weather data depending on the city sent
    fetch(`http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}`)
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
      })
      .catch((err) => console.error(err));
  };

  const handleWeather = () => { // is called when the "search" button has been clicked
    fetchInfo(cityName);
  };

  return (
    <div>
      <label className="search-label">Search city by name:</label>
      <div className="search-input">
        <input type="text" id="city" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Search Location" />
        <button className="search-button" onClick={(e) => handleWeather(e)}>
          Search
        </button>
      </div>
    </div>
  );
}
