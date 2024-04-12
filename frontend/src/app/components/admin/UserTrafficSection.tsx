"use client";
import { Spacer } from "@nextui-org/react";
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

interface UserTrafficSectionProps {
  month: string;
  users: number[];
}

const UserTrafficSection: React.FC<UserTrafficSectionProps> = ({
  month,
  users
}) => {
  const dummyBarData = {
    labels: Array.from(
      { length: users.length },
      (_, i) => `${month.split(" ")[0]} ` + (i + 1)
    ),
    datasets: [
      {
        label: "site visits",
        data: users,
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
        <span className="text-lg font-semibold">{month}</span>
      </div>
      <div className="mt-2">
        <Bar
          data={dummyBarData}
          width={400}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      <Spacer y={8} />
    </>
  );
};

export default UserTrafficSection;
