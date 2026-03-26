import { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherForRegions } from "../utils/api";

function RegionalWeather() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const regions = ["New York", "London", "Tokyo", "Sydney", "Mumbai"];
        const data = await Promise.all(regions.map(region => fetchWeatherForRegions(region)));
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching regional weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="regional-weather">
      <h1 className="title">🌍 Regional Weather</h1>
      {loading && <p className="loading">⏳ Loading regional weather data...</p>}
      {weatherData.map((weather, index) => (
        <WeatherCard key={index} data={weather} />
      ))}
    </div>
  );
}

export default RegionalWeather;