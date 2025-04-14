"use client";

import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Search from "@/components/search";
import Footer from "@/components/footer";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/axios";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import CheckIfData from "@/components/check-data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function ClassesTable() {
  const [classes, setClasses] = useState([]);
  const [facultyName, setFacultyName] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { parseparams } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    fetchClasses(currentPage, query);
  }, [currentPage, query]);

  const fetchClasses = async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/data/faculties/view/classes/${parseparams}?page=${page}&query=${search}`
      );
      setClasses(response.data.classes);
      setFacultyName(response.data.classes[0]?.facultyName || "");
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching classes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleExpandClass = (Id: string) => {
    router.push(`/faculties/view/classes/students/${Id}`);
  };

  const handleClassEdit = (id: string) => {
    router.push(`/classes/edit/${id}`);
  };

  const handleClassDelete = async (Id: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this class?");
    if (!confirmSubmission) return;

    try {
      await axiosInstance.delete(`/api/data/classes/delete/${Id}`);
      await fetchClasses(currentPage, query);
    } catch (error) {
      console.error("error is :", error);
    }
  };

  // Average GPA per class DONT TOUCH THIS ANY MORE
  const barChartData = {
    labels: classes.map((c: any) => c.className),
    datasets: [
      {
        label: "Average GPA",
        data: classes.map((c: any) => c.avgGpa ?? 0),
        backgroundColor: "rgba(124, 58, 237, 0.6)",
        borderColor: "rgba(124, 58, 237, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Chart data for Number of Students per Class
  const pieChartData = {
    labels: classes.map((c: any) => c.className),
    datasets: [
      {
        data: classes.map((c: any) => c.numOfStudents),
        backgroundColor: [
          "#8B5CF6", "#6366F1", "#EC4899", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"
        ],
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <CheckIfData>
      <ToastContainer />
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-violet-800 mb-6">
            Classes for Faculty: {facultyName}
          </h1>

          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <Search placeholder="Search classes..." />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-800"></div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="bg-violet-800 text-white">
                      <th className="px-4 py-3 text-left">Class Name</th>
                      <th className="px-4 py-3 text-left">Year</th>
                      <th className="px-4 py-3 text-center">No. of Students</th>
                      <th className="px-4 py-3 text-center">Average GPA</th>
                      <th className="px-4 py-3 text-center">Median GPA</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {classes.map((classItem: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-medium text-gray-900">{classItem.className}</td>
                        <td className="px-4 py-3 text-gray-700">{classItem.classYear}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{classItem.numOfStudents}</td>
                        <td className="px-4 py-3 text-center">
                            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full font-medium">
                              {classItem.avgGpa ? classItem.avgGpa.toFixed(2) : 'N/A'}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              {classItem.medianGpa ? classItem.medianGpa.toFixed(2): `N/A`}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleExpandClass(classItem.classId)}
                              className="bg-violet-700 text-white px-3 py-1.5 rounded-md hover:bg-violet-800 transition text-sm flex items-center"
                            >
                              Expand
                            </button>
                            <button
                              onClick={() => handleClassEdit(classItem.classId)}
                              className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition text-sm flex items-center"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleClassDelete(classItem.classId)}
                              className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition text-sm flex items-center"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-center mt-4 gap-2">
                <button
                  onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePagination(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <div className="mt-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Class Statistics Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Average GPA per Class</h3>
                    <div className="h-64">
                      <Bar data={barChartData} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Number of Students per Class</h3>
                    <div className="h-64 flex justify-center">
                      <Pie data={pieChartData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              padding: 20,
                              font: {
                                size: 12
                              }
                            }
                          }
                        }
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
        </CheckIfData>
    </>
  );
}