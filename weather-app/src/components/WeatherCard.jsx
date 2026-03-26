import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { main, weather, name } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>Temperature: {main.temp} °C</p>
      <p>Humidity: {main.humidity} %</p>
      <p>Condition: {weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
    </div>
  );
};

export default WeatherCard;