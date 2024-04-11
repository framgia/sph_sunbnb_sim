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
    /* turn this into dynamic month on integration */
    labels: Array.from({ length: 31 }, (_, i) => "April " + (i + 1)),
    datasets: [
      {
        label: "site visits",
        data: [
          12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3,
          5, 2, 3, 12, 19, 3, 5, 2, 3, 12
        ],
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
    <>
      <div className="mb-2">
        {/* turn this into dynamic month and year on integration */}
        <span className="text-lg font-semibold">April 2024</span>
      </div>
      <div className="my-5">
        <Bar
          data={dummyBarData}
          width={400}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    </>
  );
};

export default UserTrafficSection;
