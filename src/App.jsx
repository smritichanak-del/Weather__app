import { useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import TempChart from "./components/TempChart";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <ThemeToggle />

      <h1 className="title">🌤 Weather Pro</h1>

      <SearchBox
        setWeather={setWeather}
        setForecast={setForecast}
        setLoading={setLoading}
      />

      {loading && <p className="loading">Loading...</p>}

      {weather && <WeatherCard data={weather} />}
      {forecast && <Forecast data={forecast} />}
      {forecast && <TempChart data={forecast} />}
    </div>
  );
}

export default App;