import { useState, useEffect } from "react";

const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lon) return;

      setLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;

      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
};

export default useWeather;