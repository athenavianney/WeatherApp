
import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';

function App() {
const [weatherInfo, setWeatherInfo] = useState();

  const handleData = (data) => {
    setWeatherInfo(data);
    console.log("Recibe info en App");
  }

  return (
    <div className="App">
      <Search data={handleData}/>
      <hr/>
      {weatherInfo !== undefined && <WeatherCard info={weatherInfo}/>}
    </div>
  );
}

export default App;
