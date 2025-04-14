"use client";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Search from "@/components/search";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    fetchFaculties(currentPage, query);
  }, [currentPage, query]);

  const fetchFaculties = async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/data/faculties/view?page=${page}&query=${search}`
      );

      setFaculties(response.data.data);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  }

  const handleExpandClass = (facultyId: string) => {
    router.push(`/faculties/view/classes/${facultyId}`)
  }

  const handleFacultyEdit = (facultyId: string) => {
    router.push(`/faculties/edit/${facultyId}`)
  };

  const handleFacultyDelete = async (studentId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;

    try {
      await axiosInstance.post("/api/data/faculties/delete", { student: studentId });
      fetchFaculties(currentPage, query);
    } catch (error) {
      console.error("error is :", error);
    }
  };

  const handlePagination = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };


  const barChartData = {
    labels: faculties.map((f: any) => f.name),
    datasets: [
      {
        label: "Average GPA",
        data: faculties.map((f: any) => f.avgGpa ?? 0),
        backgroundColor: "rgba(124, 58, 237, 0.6)",
        borderColor: "rgba(124, 58, 237, 1)",
        borderWidth: 2,
      },
    ],
  };


  const pieChartData = {
    labels: faculties.map((f: any) => f.name),
    datasets: [
      {
        data: faculties.map((f: any) => f.numOfClasses),
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
          <h1 className="text-3xl font-bold text-violet-800 mb-6">Faculty Management</h1>

          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <Search placeholder="Search faculties..." />
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
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Faculty Name</th>
                      <th className="px-4 py-3 text-left">Head Of Faculty</th>
                      <th className="px-4 py-3 text-center">No. of Classes</th>
                      <th className="px-4 py-3 text-center">Average GPA</th>
                      <th className="px-4 py-3 text-center">Median GPA</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {faculties.map((faculty: any, index: number) => (
                      <tr key={faculty.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 text-sm text-gray-700">{faculty.id}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{faculty.name}</td>
                        <td className="px-4 py-3 text-gray-700">{faculty.headOfFaculty}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{faculty.numOfClasses}</td>
                        <td className="px-4 py-3 text-center">
                            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full font-medium">
                              {faculty.avgGpa ? faculty.avgGpa.toFixed(2):'N/A'}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              {faculty.medianGpa ?faculty.medianGpa.toFixed(2):'N/A'}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleExpandClass(faculty.id)}
                              className="bg-violet-700 text-white px-3 py-1.5 rounded-md hover:bg-violet-800 transition text-sm flex items-center"
                            >
                              Expand
                            </button>
                            <button
                              onClick={() => handleFacultyEdit(faculty.id)}
                              className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition text-sm flex items-center"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleFacultyDelete(faculty.id)}
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Faculty Statistics Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Average GPA per Faculty</h3>
                    <div className="h-64">
                      <Bar data={barChartData}  />
                    </div>
                  </div>


                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Number of Classes per Faculty</h3>
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