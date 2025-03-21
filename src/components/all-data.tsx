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
      .get(`api/data/dashboard-data`)
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
  const handleStudentDelete = (studentId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this student?");
    if (!confirmSubmission) return;
    axiosInstance
      .post(
        `api/data/delete-student`,
        {
          student: studentId,
        })
      .then(() => {
      })
  };
  const handleClassDelete = (classId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this class?");
    if (!confirmSubmission) return;
    axiosInstance
      .post(
        `api/data/delete-class`,
        { classId
        })
      .then(() => {
      })
  };
  const handleFacultyDelete = (facultyId: string) => {
    const confirmSubmission = window.confirm("Are you sure you want to delete this faculty?");
    if (!confirmSubmission) return;
    axiosInstance
      .post(
        `api/data/delete-faculty`,
        { facultyId
        })
  };

  return (
    <>
      <ToastContainer />
      <div>
        {allData.length > 0
          ? allData.map((faculty: any, index) => (
              <div
                key={`faculty-${index}`}
                style={{
                  border: "2px solid black",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <h2>{faculty.name} Head:{faculty.head_of_faculty}
                  <button
                    onClick={() => handleFacultyEdit(faculty.id)}
                    className="bg-blue-600 text-white px-3 py-1 mx-2 rounded-lg hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600 transition"
                  >
                    Edit
                  </button>
                <button
                  onClick={() =>
                    handleFacultyDelete(faculty.id)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition"
                >
                  Delete
                </button>
                </h2>
                {faculty.classes.map((cls: any, index) => (
                  <div
                    key={`class-${index}`}
                    style={{
                      border: "1px solid gray",
                      margin: "10px",
                      padding: "10px",
                    }}
                  >
                    <h3>
                      Class {cls.name} Year {cls.year}
                      <button
                        onClick={() => handleClassEdit(cls.id)}
                        className="bg-blue-600 text-white px-3 py-1 mx-2 rounded-lg hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleClassDelete(cls.id)
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition"
                      >
                        Delete
                       </button>

                    </h3>



                    <ul>
                      {cls.students?.map((student: any) => (
                        <li key={student.student_id}>
                          {student.name} {student.surname} | GPA: {student.gpa}
                          <div className="space-x-2">
                            <button
                              onClick={() =>
                                handleStudentEdit(student.student_id)
                              }
                              className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleStudentDelete(student.student_id)
                              }
                              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </>
  );
}
export default Alldata;
