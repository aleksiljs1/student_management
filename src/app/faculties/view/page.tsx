"use client";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Search from "@/components/search";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/axios";
import { useRouter, useSearchParams } from "next/navigation";

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
        `/api/data/faculties/get-faculties-data?page=${page}&query=${search}`
      );

      setFaculties(response.data.data);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  };
  const handleExpandClass = (facultyId: string) => {
    router.push(`/faculties/edit/${facultyId}`)
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
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="p-4">
        <div className="mb-4">
          <Search placeholder="Search faculties..."  />

        </div>

        {loading ? (
          <p className="text-2xl">Loading...</p>
        ) : (
          <>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="text-violet-600">
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Faculty Name</th>
                <th className="border p-2">Head Of Faculty</th>
                <th className="border p-2">No. of Classes</th>
                <th className="border p-2">Average GPA</th>
                <th className="border p-2">Median GPA</th>
                <th className="border p-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {faculties.map((faculty: any) => (
                <tr key={faculty.id} className="border">
                  <td className="border p-2">{faculty.id}</td>
                  <td className="border p-2">{faculty.name}</td>
                  <td className="border p-2">{faculty.headOfFaculty}</td>
                  <td className="border p-2">{faculty.numOfClasses}</td>
                  <td className="border p-2">{faculty.avgGpa}</td>
                  <td className="border p-2">{faculty.medianGpa}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleExpandClass(faculty.id)}
                      className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition mr-1"
                    >
                      Expand
                    </button>
                    <button
                      onClick={() => handleFacultyEdit(faculty.id)}
                      className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleFacultyDelete(faculty.id)}
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
