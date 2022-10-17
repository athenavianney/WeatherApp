import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import "./weather.css";

// Displays the weather info for 5 hours on the day selected
export default function ForecastByHour({ data }) {
  const [hoursInfo, setHoursInfo] = useState([]);
  const [hoursDisplay, setHoursDisplay] = useState([]);
  const [index, setIndex] = useState();

  const changeDisplayHours = (data) => { //changes the 5 hours that will be on display
    const x = [];
    for (let i = index; i < index + 5; i++) {
      x.push(data[i]);
    }
    return Promise.all(x);
  };
  
  useEffect(() => {
    if (data) {
      setIndex(0);
      setHoursInfo(data);
      changeDisplayHours(data).then((x) => {
        setHoursDisplay(x);
      });
    }
  }, [data]);

  useEffect(() => {
    if (index !== undefined) {
      changeDisplayHours(hoursInfo).then((x) => {
        setHoursDisplay(x);
      });
    }
  }, [index]);

  const changeHours = (amount) => { 
    const x = index;
    setIndex(x + amount);
  };

  return (
    <div>
      <div className="forecast-hour">
        <p className="title-2">Hourly forecast</p>
        <div className="row">
          <button className="hours-button" type="button" key="goBack" id="goBack" hidden={index === 0} onClick={(e) => changeHours(-1)}>
            <img src="https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png" width="50" alt="Vector Png White Arrow" style={{transform: "rotate(180deg)"}} />
          </button>
          {hoursDisplay &&
            hoursDisplay.map((day, i) => (
              <>
                <div className="column-hour" key={i} id={i}>
                  <p className="text">{moment(day.time).format("LT")}</p>
                  <img className="icon" src={day.condition.icon} alt="condition"></img>
                  <p className="text">{day.temp_c} °C</p>
                </div>
              </>
            ))}
          <button className="hours-button" type="button" key="goForward" id="goForward" hidden={index === 19} onClick={(e) => changeHours(1)}>
            <img src="https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png" width="50" alt="Vector Png White Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
