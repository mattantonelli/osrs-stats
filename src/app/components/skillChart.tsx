"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

const skillColors : {
  [key: string]: string
} = {
  attack: "rgb(155, 32, 7)",
  strength: "rgb(4, 149, 90)",
  defence: "rgb(98, 119, 190)",
  ranged: "rgb(109, 144, 23)",
  prayer: "rgb(159, 147, 35)",
  magic: "rgb(50, 80, 193)",
  runecraft: "rgb(170, 141, 26)",
  construction: "rgb(130, 116, 95)",
  hitpoints: "rgb(131, 126, 126)",
  agility: "rgb(7, 133, 9)",
  herblore: "rgb(108, 52, 87)",
  thieving: "rgb(58, 60, 137)",
  crafting: "rgb(151, 110, 77)",
  fletching: "rgb(3, 141, 125)",
  slayer: "rgb(100, 100, 100)",
  hunter: "rgb(92, 89, 65)",
  mining: "rgb(93, 143, 167)",
  smithing: "rgb(108, 107, 82)",
  fishing: "rgb(106, 132, 164)",
  cooking: "rgb(112, 35, 134)",
  firemaking: "rgb(189, 120, 25)",
  woodcutting: "rgb(52, 140, 37)",
  farming: "rgb(101, 152, 63)"
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

interface LevelChartParams {
  skills: Record<string, number>;
}

export default function SkillChart({ skills } : LevelChartParams) {
  const skillLabels = Object.keys(skills);
  const data = {
    labels: skillLabels,
    datasets: [
      {
        label: undefined,
        data: Object.values(skills),
        backgroundColor: skillLabels.map(skill => skillColors[skill])
      }
    ]
  };

  return (
    <Bar data={data} options={options} />
  );
}