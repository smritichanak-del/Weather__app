import { useState } from "react";

function SearchBox({ setWeather, setForecast, setLoading }) {
  const [location, setLocation] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location) return;

    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
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
    <form onSubmit={handleSearch} className="search-box">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default SearchBox;