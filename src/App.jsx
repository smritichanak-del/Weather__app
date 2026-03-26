import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import TempChart from "./components/TempChart";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [nearbyAreas, setNearbyAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
          fetchNearbyAreasWeather(latitude, longitude);
        },
        () => {
          console.log("Location access denied, using default city");
        }
      );
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyAreasWeather = async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      
      // Define nearby areas (offset by ~0.5 degrees)
      const offsets = [
        { name: "North", lat: lat + 0.5, lon: lon },
        { name: "South", lat: lat - 0.5, lon: lon },
        { name: "East", lat: lat, lon: lon + 0.5 },
        { name: "West", lat: lat, lon: lon - 0.5 },
        { name: "Northeast", lat: lat + 0.35, lon: lon + 0.35 },
        { name: "Northwest", lat: lat + 0.35, lon: lon - 0.35 },
      ];

      const weatherPromises = offsets.map((area) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${area.lat}&lon=${area.lon}&appid=${API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => ({ ...data, areaName: area.name }))
      );

      const results = await Promise.all(weatherPromises);
      setNearbyAreas(results);
    } catch (err) {
      console.error("Error fetching nearby areas weather:", err);
    }
  };

  return (
    <div className="app">
      <ThemeToggle />

      <h1 className="title">🌤️ Weather </h1>

      <SearchBox
        setWeather={setWeather}
        setForecast={setForecast}
        setLoading={setLoading}
      />

      {loading && <p className="loading">⏳ Loading weather data...</p>}

      {weather && (
        <div className="main-weather">
          <h2>📍 Your Location</h2>
          <WeatherCard data={weather} />
        </div>
      )}
      
      {forecast && <Forecast data={forecast} />}
      {forecast && <TempChart data={forecast} />}

      {nearbyAreas.length > 0 && (
        <div className="nearby-areas">
          <h2>🗺️ Nearby Areas</h2>
          <div className="areas-grid">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="area-card">
                <h3>{area.areaName}</h3>
                <p className="area-city">{area.name}</p>
                <p className="area-temp">{Math.round(area.main.temp)}°C</p>
                <p className="area-condition">{area.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;