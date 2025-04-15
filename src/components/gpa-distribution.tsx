"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { axiosInstance } from "@/axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GpaDistributionChart() {
  const [distribution, setDistribution] = useState<any>(null);

  useEffect(() => {
    const fetchGpaData = async () => {
      try {
        const response = await axiosInstance.get("/api/data/students/charts");
        setDistribution(response.data);
      } catch (err) {
        console.error("Failed to load GPA distribution", err);
      }
    };

    fetchGpaData();
  }, []);


  if (!distribution) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          GPA Distribution Among Students
        </h3>
        <p>Loading chart data...</p>
      </div>
    );
  }

  const pieData = {
    labels: ["GPA > 3", "GPA 2–3", "GPA < 2"],
    datasets: [
      {
        data: [
          distribution.above3,
          distribution.between2and3,
          distribution.below2,
        ],
        backgroundColor: ["#10B981", "#6366F1", "#EF4444"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        GPA Distribution Among Students
      </h3>
      <div className="h-64 flex justify-center items-center">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
}
