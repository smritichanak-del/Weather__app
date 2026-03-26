import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function TempChart({ data }) {
  const temps = data.list.slice(0, 8);

  const chartData = {
    labels: temps.map(item =>
      new Date(item.dt_txt).getHours() + ":00"
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps.map(item => item.main.temp),
        borderColor: "rgba(240, 147, 251, 1)",
        backgroundColor: "rgba(240, 147, 251, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "rgba(240, 147, 251, 1)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            family: "'Poppins', sans-serif",
            size: 13,
            weight: 500,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(240, 147, 251, 1)",
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: "'Poppins', sans-serif",
          size: 13,
          weight: 600,
        },
        bodyFont: {
          family: "'Poppins', sans-serif",
          size: 12,
        },
        titleMarginBottom: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          padding: 10,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">📈 24-Hour Temperature Trend</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}