"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

interface LevelChartParams {
  levels: Record<string, number>;
}

const skillColors = [
  "rgb(155, 32, 7)", "rgb(4, 149, 90)", "rgb(98, 119, 190)", "rgb(109, 144, 23)", "rgb(159, 147, 35)", "rgb(50, 80, 193)", "rgb(170, 141, 26)", "rgb(130, 116, 95",
  "rgb(131, 126, 126)", "rgb(7, 133, 9)", "rgb(108, 52, 87)", "rgb(58, 60, 137)", "rgb(151, 110, 77)", "rgb(3, 141, 125)", "rgb(100, 100, 100)", "rgb(92, 89, 65)",
  "rgb(93, 143, 167)", "rgb(108, 107, 82)", "rgb(106, 132, 164)", "rgb(112, 35, 134)", "rgb(189, 120, 25)", "rgb(52, 140, 37)", "rgb(101, 152, 63)"
];

export default function LevelChart({ levels } : LevelChartParams) {
  const data = {
    labels: Object.keys(levels),
    datasets: [
      {
        label: undefined,
        data: Object.values(levels),
        backgroundColor: skillColors
      }
    ]
  };

  const gridColor = "rgba(80, 80, 80, 0.5)";

  const options = {
    borderColor: "rgba(0, 0, 0, 0.5)",
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor
        }
      },
      y: {
        min: 0,
        max: 99,
        grid: {
          color: gridColor
        }
      }
    }
  };

  return (
    <Bar data={data} options={options} />
  );
}