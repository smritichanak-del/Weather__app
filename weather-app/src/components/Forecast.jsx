import React from "react";

const Forecast = ({ data }) => {
  return (
    <div className="forecast">
      <h2 className="forecast-title">Weather Forecast</h2>
      <div className="forecast-grid">
        {data.list.map((item) => (
          <div key={item.dt} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
            <p>{item.weather[0].description}</p>
            <p>{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;