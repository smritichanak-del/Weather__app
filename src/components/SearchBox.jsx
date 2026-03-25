import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function SearchBox({ setWeather, setForecast, setLoading }) {
  const [city, setCity] = useState("");

  const fetchAll = async (lat, lon) => {
    try {
      setLoading(true);

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
      alert("Error fetching data ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!city) return;

    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      alert("City not found ❌");
      return;
    }

    fetchAll(geoData[0].lat, geoData[0].lon);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}