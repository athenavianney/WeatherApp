import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./weather.css";

//Searches city and returns weather information
export default function Search({ data }) {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  const APIkey = process.env.REACT_APP_WEATHER_API_KEY; //API KEY stored in env file

  useEffect(() => {
    data(weatherData);
  }, [weatherData]);

  // Gets weather data depending on the city sent and for the following 5 days
  const fetchInfo = (city) => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${city}&days=5`)
      .then((response) => response.json())
      .then((response) => {
        //Stores only the information needed
        setWeatherData({
          city: response.location.name,
          country: response.location.country,
          region: response.location.region,
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
          hours: response.forecast.forecastday?.[0].hour,
          timezone: response.location.tz_id
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
        <input className="input" type="text" id="city" value={cityName} onChange={(e) => setCityName(e.target.value)} onKeyUp={(e) => ((e.key === "Enter") ?  handleWeather(e) : null)} placeholder="Search Location" />
        <button className="search-button" onClick={(e) => handleWeather(e)}>
          Search
        </button>
      </div>
    </div>
  );
}
