import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlConst } from "@/consts/path-consts";
//im stupid
function Showall(){
  const [allData, setAllData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);



  const handleStudentChange = (studentId:string) => {
    axios
      .post("http://localhost:3000/api/data/delete-student", {
        student: studentId,
      })
      .then((response) => {
        alert("student has been deleted:", );
        alert( response.data);
      })
      .catch((error) => {
        alert(error.response?.data.message || "Error deleting student.");
      });
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data/dashboard-data", {
        headers: {
          type: "allData"
        },
      })
      .then((response) => {
        setAllData(response.data);
      })
      .catch((err) => {
        setError(err.message || "An error occurred , always whanted to say that");
      });
  }, []);

  return (
    <div>
      {allData.map((faculty: any, index) => (
        <div key={`faculty-${index}`} style={{ border: "2px solid black", margin: "10px", padding: "10px" }}>
          <h2>{faculty.name}</h2>

          {faculty.classes.map((cls: any, index) => (
            <div key={`class-${index}`} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
              <h3>{cls.name}</h3>
              <ul>
                {cls.students?.map((student: any) => (
                  <li key={student.student_id}>
                    {student.name} | {student.surname} | {student.gpa}
                    <div className="space-x-2">
                      <button  className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition">
                        Edit
                      </button>
                      <button onClick={() => handleStudentChange(student.student_id)} className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
          }
export default Showall