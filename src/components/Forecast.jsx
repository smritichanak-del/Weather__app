export default function Forecast({ data }) {
  const daily = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast">
      {daily.slice(0, 5).map((item, i) => (
        <div className="forecast-card" key={i}>
          <p className="day">
            {new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short"
            })}
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt=""
          />

          <p className="temp-small">
            {Math.round(item.main.temp)}°
          </p>
        </div>
      ))}
    </div>
  );
}