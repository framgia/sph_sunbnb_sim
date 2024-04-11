"use client";
import {
  BarElement,
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  Tooltip
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const UserTrafficSection: React.FC = () => {
  const dummyBarData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets: [
      {
        label: "site visits",
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 34, 0, 1)",
          "rgba(255, 34, 0, 1)",
          "rgba(255, 34, 0, 1)",
          "rgba(255, 34, 0, 1)",
          "rgba(255, 34, 0, 1)",
          "rgba(255, 34, 0, 1)",
          "rgba(255, 34, 0, 1)"
        ]
      }
    ]
  };
  return (
    <div>
      <Bar
        data={dummyBarData}
        width={400}
        height={400}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default UserTrafficSection;
