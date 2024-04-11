"use client";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  LinearScale,
  Tooltip
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  DoughnutController,
  ArcElement
);

const ListingDoughnut: React.FC<{ approved: number; unapproved: number }> = ({
  approved,
  unapproved
}) => {
  const dummyDoughData = {
    labels: ["Approved", "Unapproved"],
    datasets: [
      {
        label: "site visits",
        data: [approved, unapproved],
        backgroundColor: ["rgba(255, 255, 255, 1)", "rgba(255, 34, 10, 1)"]
      }
    ]
  };
  return <Doughnut data={dummyDoughData} height={125} width={125} />;
};

export default ListingDoughnut;
