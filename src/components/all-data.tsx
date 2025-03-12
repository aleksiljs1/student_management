"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

function Showall() {
  const [allData, setAllData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  console.log("being read");
  //waits for client to load to get token so we avoid that dumb ahh error
  //so i dont reuse the code to ,get token. loading is neccecary as an event lissener
  //it does not get token in the first render

  useEffect(() => {
    console.log("useEffect parsing token:");
    console.log("sending token");
    axiosInstance
      .get(`api/data/dashboard-data`)
      .then((response) => {
        console.log(response);
        setAllData(response.data ?? []);
      })
      .catch((err) => {
        setAllData([]);
      });
  }, []);

  const handleStudentEdit = (studentId: string) => {
    router.push(`/edit-student/${studentId}`);
  };
  const handleStudentDelete = (studentId: string) => {
    axiosInstance
      .post(
        `api/data/delete-student`,
        {
          student: studentId,
        },
        {},
      )
      .then((response) => {
        alert("student has been deleted:");
        alert(response.data);
      })
      .catch((err) => {
        console.log(`err is`, err);
      });
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
                <h2>{faculty.name}</h2>

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
                      {cls.name} {cls.year}
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
export default Showall;
