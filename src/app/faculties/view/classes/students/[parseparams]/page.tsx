"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/axios";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");//change from classname reserved keyword
  const [classYear, setClassYear] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const { parseparams } = useParams();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    fetchStudents(currentPage, query);
  }, [currentPage, query]);

  const fetchStudents = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/data/faculties/view/classes/students/${parseparams}?page=${page}&query=${search}`
      );

      setStudents(response.data.students);
      setClassName(response.data.className);
      setClassYear(response.data.classYear);
      setFacultyName(response.data.facultyName);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (searchQuery) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", searchQuery);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  const handleStudentEdit = (id: string) => {
    router.push(`/users/edit/${id}`)
  };
  const handleStudentDelete = async (Id: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;

    try {
      await axiosInstance.delete(`/api/data/users/delete/${Id}`);

      await fetchStudents(currentPage, query);
    } catch (error) {
      console.error("error is :", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="p-4">


        <div className="mb-4">
          <input
            type="text"
            placeholder="Search students..."
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border rounded mb-4"
          />
        </div>

        {loading ? (

          <p className="text-2xl">Loading...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">
              - Class: {students[0]?.student_class.name}  Year: {students[0]?.student_class.year}
            </h1>


            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="text-violet-600">
              <tr className="bg-gray-100">
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Surname</th>
                <th className="border p-2">Faculty</th>
                <th className="border p-2">GPA</th>
                <th className="border p-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {students.map((student:any, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.surname}</td>
                  <td className="border p-2">{student.faculty.name}</td>
                  <td className="border p-2">{student.gpa}</td>
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
  );
}
