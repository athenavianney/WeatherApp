import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import "./weather.css";

export default function ForecastByHour({ data }) {
  const [hourInfo, setHourInfo] = useState();

  useEffect(() => {
    const x = [];
    if (data) {
      x.push(data[0]);
      x.push(data[4]);
      x.push(data[8]);
      x.push(data[16]);
      x.push(data[20]);
      setHourInfo(x);
    }
  }, [data]);

  return (
    <div>
      <div className="forecast-hour">
        <p className="title-2"> Hourly forecast </p>
        <div className="row">
          {hourInfo &&
            hourInfo.map((day, i) => (
              <div className="column-hour" key={i} id={i}>
                <p className="text">{moment(day.time).format("LT")}</p>
                <img className="icon" src={day.condition.icon} alt="condition"></img>
                <p className="text">{day.temp_c} °C</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
