import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./weather.css";

export default function Search({ data }) {
  //Search city and returns weather information

  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  const APIkey = process.env.REACT_APP_WEATHER_API_KEY; //API KEY stored in env file

  useEffect(() => {
    // Re-renders once the weather information has been changed/received
    data(weatherData);
  }, [weatherData]);

  const fetchInfo = (city) => {
    // Gets weather data depending on the city sent and for the following 5 days
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${city}&days=5`)
      .then((response) => response.json())
      .then((response) => {
        setWeatherData({ //Stores only the information needed
          city: response.location.name,
          country: response.location.country,
          date: new Date(response.location.localtime),
          icon: response.current.condition.icon,
          currentIcon: response.current.condition.icon,
          condition: response.current.condition.text,
          currentCondition: response.current.condition.text,
          temp: response.current.temp_c,
          currentTemp: response.current.temp_c,
          feelsLike: response.current.feelslike_c,
          maxTemp: response.forecast.forecastday?.[0].day.maxtemp_c,
          minTemp: response.forecast.forecastday?.[0].day.mintemp_c,
          wind: response.current.wind_kph,
          windDir: response.current.wind_dir,
          forecast: response.forecast.forecastday,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "City not found, please try again!",
        });
      });
  };

  const handleWeather = () => {
    fetchInfo(cityName);
  };

  return (
    <div>
      <div className="search-input">
        <label className="search-text mb-3">Search city by name:</label>
        <input className="input" type="text" id="city" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Search Location" />
        <button className="search-button" onClick={(e) => handleWeather(e)}>
          Search
        </button>
      </div>
    </div>
  );
}
