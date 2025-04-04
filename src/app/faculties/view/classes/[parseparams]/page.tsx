"use client";

import { ToastContainer } from "react-toastify";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/axios";
import React, { useEffect, useState } from "react";

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
      const response =await axiosInstance.get(`/api/data/faculties/view/classes/${parseparams}?page=${page}&query=${search}`);
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

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", searchQuery);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleExpandClass = (Id: string) => {
    router.push(`/faculties/view/classes/students/${Id}`);
  };
  const handleClassEdit = (id: string) => {
    router.push(`/classes/edit/${id}`)
  };
  const handleClassDelete = async (Id: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;

    try {
      await axiosInstance.delete(`/api/data/classes/delete/${Id}`);

      await fetchClasses(currentPage, query);
    } catch (error) {
      console.error("error is :", error);
    }
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Faculty: {facultyName}</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search classes..."
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border rounded mb-4"
          />
        </div>
        {loading ? (
          <p className="text-2xl">Loading...</p>
        ) : (
          <>


            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="text-violet-600">
              <tr className="bg-gray-100">
                <th className="border p-2">Class Name</th>
                <th className="border p-2">Year</th>
                <th className="border p-2">No. of Students</th>
                <th className="border p-2">Average GPA</th>
                <th className="border p-2">Median GPA</th>
                <th className="border p-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {classes.map((classItem: any, index: number) => (
                <tr key={index} className="border">
                  <td className="border p-2">{classItem.className}</td>
                  <td className="border p-2">{classItem.classYear}</td>
                  <td className="border p-2">{classItem.numOfStudents}</td>
                  <td className="border p-2">{classItem.avgGpa}</td>
                  <td className="border p-2">{classItem.medianGpa}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleExpandClass(classItem.classId)}
                      className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition mr-1"
                    >
                      Expand
                    </button>
                    <button
                      onClick={() => handleClassEdit(classItem.classId)}
                      className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleClassDelete(classItem.classId)}
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
