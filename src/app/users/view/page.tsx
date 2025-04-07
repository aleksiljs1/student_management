"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Search from "@/components/search";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    fetchStudents(currentPage, query);
  }, [currentPage, query]);

  const fetchStudents = async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/data/students?page=${page}&query=${search}`
      );
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentDelete = async (studentId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;

    try {
      await axiosInstance.post("/api/data/delete-student", { student: studentId });
      // Refresh data after deletion
      fetchStudents(currentPage, query);
    } catch (error) {
      console.error("error is :", error);
    }
  };

  const handleStudentEdit = (studentId: string) => {
    router.push(`/users/edit/${studentId}`);
  };

  const handlePagination = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <Search placeholder="Search students..." />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-800"></div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">All Students</h1>

              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="bg-violet-800 text-white">
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Surname</th>
                      <th className="px-4 py-3 text-left">Faculty</th>
                      <th className="px-4 py-3 text-left">Study Group</th>
                      <th className="px-4 py-3 text-left">Year</th>
                      <th className="px-4 py-3 text-center">GPA</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {students.map((student: any, index: number) => (
                      <tr key={student.student_id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 text-gray-700">{student.student_id}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                        <td className="px-4 py-3 text-gray-700">{student.surname}</td>
                        <td className="px-4 py-3 text-gray-700">{student.faculty.name}</td>
                        <td className="px-4 py-3 text-gray-700">{student.student_class.name}</td>
                        <td className="px-4 py-3 text-gray-700">{student.student_class.year}</td>
                        <td className="px-4 py-3 text-center">
                            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full font-medium">
                              {student.gpa.toFixed(2)}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleStudentEdit(student.student_id)}
                              className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition text-sm flex items-center"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleStudentDelete(student.student_id)}
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}