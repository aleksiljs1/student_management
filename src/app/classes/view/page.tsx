"use client";
import { axiosInstance } from "@/axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Search from "@/components/search";
import React, { useEffect, useState } from "react";


export default function View() {
  const [students, setClasses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();


  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';



  const fetchClasses = async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/data/classes/view?page=${page}&query=${search}`
      );
      setClasses(response.data.students);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClasses(currentPage, query);
  }, [currentPage, query]);


  const handleStudentDelete = async (studentId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;
    await axiosInstance.delete(`api/data/users/delete/${studentId}`);
  }
  const handleStudentEdit = (studentId: string) => {

    const confirmSubmission = window.confirm("Are you sure you want to edit this student?");
    if (!confirmSubmission) return;
    router.push(`users/edit/${studentId}`);
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
      <div className="p-4">
        <div className="mb-4">
          <Search placeholder="Search students..." />
        </div>

        {loading ? (
          <p className="text-2xl">Loading...</p>
        ) : (
          <>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="text-violet-600">
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Group Name</th>
                <th className="border p-2">Group year</th>
                <th className="border p-2">Faculty</th>
                <th className="border p-2">Number of Students</th>
                <th className="border p-2">Average GPA</th>
                <th className="border p-2">Median GPA</th>
                <th className="border p-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {students.map((student: any) => (
                <tr key={student.student_id} className="border">
                  <td className="border p-2">{student.student_id}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.surname}</td>
                  <td className="border p-2">{student.gpa}</td>
                  <td className="border p-2">{student.faculty.name}</td>
                  <td className="border p-2">{student.student_class.name}</td>
                  <td className="border p-2">{student.student_class.year}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleStudentEdit(student.student_id)}
                      className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleStudentDelete(student.student_id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

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
      <Footer />
    </>
  )
}