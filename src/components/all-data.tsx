"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios";
import {ToastContainer } from "react-toastify";


function Alldata() {
  const [allData, setAllData] = useState<any[]>([]);

  const router = useRouter();



  useEffect(() => {
    axiosInstance
      .get(`api/data/show-alldata/dashboard-data`)
      .then((response) => {

        setAllData(response.data ?? []);
      })
      .catch(() => {
        setAllData([]);
      });
  }, []);

  const handleStudentEdit = (studentId: string) => {
    router.push(`users/edit/${studentId}`);
  };
  const handleFacultyEdit = (facultyId: string) => {
    router.push(`faculties/edit/${facultyId}`);
  };
  const handleClassEdit = (studentId: string) => {
    router.push(`classes/edit/${studentId}`);
  };
  const handleStudentDelete = async (studentId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;
    await axiosInstance.delete(`api/data/users/delete/${studentId}`);
  }
    const handleClassDelete = async (classId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this class?");
    if (!confirmSubmission) return;
    await axiosInstance.delete(`api/data/classes/delete/${classId}`);
  };
  const handleFacultyDelete =  async (facultyId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this faculty?");
    if (!confirmSubmission) return;

await axiosInstance.delete(`api/data/faculties/delete/${facultyId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />

      <div className="grid gap-6">
        {allData.length > 0 ? (
          allData.map((faculty: any, facultyIndex) => (
            <div
              key={`faculty-${facultyIndex}`}
              className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="bg-violet-100 p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-violet-800">
                    {faculty.name}
                  </h2>
                  <p className="text-gray-600">Head: {faculty.head_of_faculty}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFacultyEdit(faculty.id)}
                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition"
                    title="Edit Faculty"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleFacultyDelete(faculty.id)}
                    className="text-red-600 hover:bg-red-100 p-2 rounded-full transition"
                    title="Delete Faculty"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {faculty.classes.map((cls: any, classIndex) => (
                  <div
                    key={`class-${classIndex}`}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {cls.name} - Year {cls.year}
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleClassEdit(cls.id)}
                          className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition"
                          title="Edit Class"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleClassDelete(cls.id)}
                          className="text-red-600 hover:bg-red-100 p-2 rounded-full transition"
                          title="Delete Class"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Surname</th>
                          <th className="px-4 py-2">GPA</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cls.students?.map((student: any) => (
                          <tr
                            key={student.student_id}
                            className="border-b hover:bg-gray-100 transition"
                          >
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">{student.surname}</td>
                            <td className="px-4 py-2">{student.gpa}</td>
                            <td className="px-4 py-2 flex space-x-2">
                              <button
                                onClick={() => handleStudentEdit(student.student_id)}
                                className="text-violet-600 hover:bg-violet-100 p-2 rounded-full transition"
                                title="Edit Student"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleStudentDelete(student.student_id)}
                                className="text-red-600 hover:bg-red-100 p-2 rounded-full transition"
                                title="Delete Student"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white shadow rounded-lg">
            <p className="text-gray-500 text-xl">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Alldata;
