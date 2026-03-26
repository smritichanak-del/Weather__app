export default function Forecast({ data }) {
  const daily = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">📅 5-Day Forecast</h3>
      <div className="forecast">
        {daily.slice(0, 5).map((item, i) => (
          <div className="forecast-card" key={i}>
            <p className="day">
              {new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather"
              className="forecast-icon"
            />

            <p className="temp-small">
              {Math.round(item.main.temp)}°
            </p>

            <p className="temp-range">
              {Math.round(item.main.temp_min)}° - {Math.round(item.main.temp_max)}°
            </p>

            <p className="temp-range" style={{ fontSize: '11px', marginTop: '5px' }}>
              💧 {item.main.humidity}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}