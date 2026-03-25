import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function TempChart({ data }) {
  const temps = data.list.slice(0, 8);

  const chartData = {
    labels: temps.map(item =>
      new Date(item.dt_txt).getHours() + ":00"
    ),
    datasets: [
      {
        label: "Temp °C",
        data: temps.map(item => item.main.temp),
      },
    ],
  };

  return <Line data={chartData} />;
}