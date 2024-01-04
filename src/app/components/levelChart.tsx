"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

interface LevelChartParams {
  levels: Record<string, number>;
}

const skillColors = [
  "#6D150D", "#C1A476", "#6B7FBE", "#096C02", "#FFFFFF", "#1B0692", "#939288", "#765435",
  "#901D11", "#1D2054", "#2EB655", "#502B43", "#765B43", "#733A09", "#958994", "#625C42",
  "#8B6711", "#65625D", "#7693AF", "#B4AB06", "#D84C01", "#866A2F", "#3F7040"
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