import Card from "@/components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Student } from "@/app/api/student-data/models/Student";

function ShowStudents() {
  const [students, setStudents] = useState<Student[]>([]);//basically ensures students will always be an array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/student-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setStudents(response.data);
        })
        .catch((err) => {
          console.error("Error with getting students:", err);
          setError("Error getting student data.");

        });
    } else {
      setError("No token found. are you logged in?");

    }
  }, []);


  if (error) return <p>{error}</p>;

  return (
    <>
      {students.map((student) => (
        <Card key={student.student_id} student={student} />
      ))}
    </>
  );
}

export default ShowStudents;