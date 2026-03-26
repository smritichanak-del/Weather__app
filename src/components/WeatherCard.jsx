export default function WeatherCard({ data }) {
  const icon = data.weather[0].icon;
  const description = data.weather[0].main;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="card">
      <h2 className="city">📍 {data.name}, {data.sys.country}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt="weather"
        className="icon"
      />

      <h1 className="temp">{Math.round(data.main.temp)}°</h1>
      <p className="weather-description">{description}</p>

      <div className="details">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-value">{data.main.humidity}%</span>
          <span className="detail-label">Humidity</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌬️</span>
          <span className="detail-value">{Math.round(data.wind.speed)} m/s</span>
          <span className="detail-label">Wind Speed</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <span className="detail-value">{Math.round(data.main.feels_like)}°</span>
          <span className="detail-label">Feels Like</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🔺</span>
          <span className="detail-value">{Math.round(data.main.pressure)} mb</span>
          <span className="detail-label">Pressure</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">👁️</span>
          <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
          <span className="detail-label">Visibility</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌅</span>
          <span className="detail-value">{sunrise}</span>
          <span className="detail-label">Sunrise</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌇</span>
          <span className="detail-value">{sunset}</span>
          <span className="detail-label">Sunset</span>
        </div>

        <div className="detail-item">
          <span className="detail-icon">☁️</span>
          <span className="detail-value">{data.clouds.all}%</span>
          <span className="detail-label">Cloudiness</span>
        </div>
      </div>
    </div>
  );
}