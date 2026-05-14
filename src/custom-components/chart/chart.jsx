// ProbabilityChart.js
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ProbabilityChart = ({ probabilities }) => {
  const data = {
    labels: probabilities.map((_, index) => `${index}`),
    datasets: [
      {
        label: "Predicted Probability",
        data: probabilities,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProbabilityChart;