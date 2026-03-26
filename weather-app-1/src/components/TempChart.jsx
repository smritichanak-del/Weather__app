import React from "react";
import { Line } from "react-chartjs-2";

const TempChart = ({ data }) => {
  const chartData = {
    labels: data.list.map((item) => new Date(item.dt * 1000).toLocaleDateString()),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.list.map((item) => item.main.temp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="temp-chart">
      <h2>Temperature Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TempChart;