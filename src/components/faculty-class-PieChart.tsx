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

type FacultyClassCount = {
  facultyName: string;
  classCount: number;
};

export default function FacultyClassChart() {
  const [facultyData, setFacultyData] = useState<FacultyClassCount[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/data/dashboard/charts/faculty-class-pie");
        setFacultyData(response.data);
      } catch (err) {
        console.error("Failed to load faculty class chart", err);
      }
    };

    fetchData();
  }, []);

  if (!facultyData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Class Distribution by Faculty
    </h3>
    <p>Loading chart data...</p>
    </div>
  );
  }

  const pieData = {
    labels: facultyData.map((item) => item.facultyName),
    datasets: [
      {
        data: facultyData.map((item) => item.classCount),
        backgroundColor: [
          "#F87171", "#60A5FA", "#34D399", "#FBBF24",
          "#A78BFA", "#FB7185", "#FCD34D",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Class Distribution by Faculty
  </h3>
  <div className="relative h-64 w-full max-w-3xl mx-auto">
  <Pie data={pieData} options={options} />
  </div>
  </div>
);
}
