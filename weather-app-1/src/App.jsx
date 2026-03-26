import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import TempChart from "./components/TempChart";
import { fetchWeatherByCoords } from "./utils/api";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        },
        () => {
          console.log("Location access denied, using default city");
        }
      );
    }
  }, []);

  const getWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      const { weatherData, forecastData } = await fetchWeatherByCoords(lat, lon);
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
      <SearchBox setWeather={setWeather} setForecast={setForecast} setLoading={setLoading} />
      {loading && <p className="loading">⏳ Loading weather data...</p>}
      {weather && <WeatherCard data={weather} />}
      {forecast && <Forecast data={forecast} />}
      {forecast && <TempChart data={forecast} />}
    </div>
  );
}

export default App;