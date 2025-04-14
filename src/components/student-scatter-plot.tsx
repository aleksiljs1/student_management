"use client";

import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  PointElement,
  LinearScale,
} from "chart.js";
import { axiosInstance } from "@/axios";

ChartJS.register(Title, Tooltip, Legend, ScatterController, PointElement, LinearScale);

export default function GpaScatterPlot() {
  const [gpaData, setGpaData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/data/graphs/scatter-plots/student-gpa-scatterPlot");
        setGpaData(response.data);
      } catch (err) {
        console.error("Failed to load GPA scatter plot", err);
      }
    };

    fetchData();
  }, []);

  if (!gpaData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          GPA Scatter Plot of Students
        </h3>
        <p>Loading chart data...</p>
      </div>
    );
  }

  const scatterData = {
    datasets: [
      {
        label: "Student GPA",
        data: gpaData.map((student: any) => ({
          x: student.studentId,
          y: student.gpa,
        })),
        backgroundColor: "#6366F1",
        borderColor: "#4F46E5",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Student ID",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "GPA",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => `Student ID: ${tooltipItem[0].raw.x}`,
          label: (tooltipItem) => `GPA: ${tooltipItem.raw.y}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        GPA Scatter Plot of Students
      </h3>
      <div className="h-96">
        <Scatter data={scatterData} options={options} />
      </div>
    </div>
  );
}
