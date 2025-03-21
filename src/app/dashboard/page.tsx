"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page: number) => {
    setLoading(true);
try {
  const response = await axiosInstance.get(`/api/data/students?page=${page}`);
  setStudents(response.data.students);
  setTotalPages(response.data.totalPages);
}

finally {
  setLoading(false);
}
  };// better when i use a method so i can make it async. Having thad said , couve done it directly
  const handleStudentDelete = (studentId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;
    axiosInstance
      .post(
        `api/data/delete-student`,
        {
          student: studentId,
        })
  };


  const handleStudentEdit = (studentId: string) => {
    router.push(`users/edit/${studentId}`);
  };

  return (
 <>
   <ToastContainer />
   <Header />
   {loading && <p className="text-2xl">Loading...</p>}
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-200  ">
        <thead className="text-violet-600">
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Surname</th>
          <th className="border p-2">GPA</th>
          <th className="border p-2">Faculty</th>
          <th className="border p-2">Study Group</th>
          <th className="border p-2">Year</th>
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
                onClick={() =>
                  handleStudentEdit(student.student_id)
                }
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


      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
   <Footer />
 </>
  );
}
