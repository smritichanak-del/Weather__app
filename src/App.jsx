import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import TempChart from "./components/TempChart";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // Fallback to a default city if location access is denied
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

  return (
    <div className="app">
      <ThemeToggle />

      <h1 className="title">🌤️ Weather Pro</h1>

      <SearchBox
        setWeather={setWeather}
        setForecast={setForecast}
        setLoading={setLoading}
      />

      {loading && <p className="loading">⏳ Loading weather data...</p>}

      {weather && <WeatherCard data={weather} />}
      {forecast && <Forecast data={forecast} />}
      {forecast && <TempChart data={forecast} />}
    </div>
  );
}

export default App;