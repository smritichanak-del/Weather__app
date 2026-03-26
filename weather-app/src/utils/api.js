import { fetchWeatherByCoords, fetchWeatherByCity } from './api';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherByCoords(lat, lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherByCity(city);
      setWeather(weatherData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, getWeather, getWeatherByCity };
};

export default useWeather;