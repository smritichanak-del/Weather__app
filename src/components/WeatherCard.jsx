export default function WeatherCard({ data }) {
  const icon = data.weather[0].icon;

  return (
    <div className="card">
      <h2 className="city">{data.name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt=""
        className="icon"
      />

      <h1 className="temp">{Math.round(data.main.temp)}°</h1>

      <div className="details">
        <div>
          💧
          <p>{data.main.humidity}%</p>
        </div>

        <div>
          🌬
          <p>{Math.round(data.wind.speed)} m/s</p>
        </div>

        <div>
          🌡
          <p>{Math.round(data.main.feels_like)}°</p>
        </div>
      </div>
    </div>
  );
}