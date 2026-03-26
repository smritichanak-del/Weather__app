import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function SearchBox({ setWeather, setForecast, setLoading }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const fetchAll = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

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
      setError("Error fetching data. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        setError("City not found. Please try another.");
        setLoading(false);
        return;
      }

      fetchAll(geoData[0].lat, geoData[0].lon);
      setCity("");
    } catch (err) {
      setError("Error searching for city. Please try again.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>
      {error && <p style={{ color: '#ffcccc', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}