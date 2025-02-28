"use client";

import { Student } from "@/app/api/student-data/models/Student";
import Image from "next/image";
import ProfilePic from "../images/Student.png";

interface Cardprops {
  student: Student;
}

function Card({ student }: Cardprops) {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg border border-gray-300">
      <p className="text-gray-800 font-medium">
        {student.studentName} {student.surname} | <b>ID:</b>{" "}
        {student.student_id} | <b>GPA:</b> {student.gpa}
      </p>

      <div className="space-x-2">
        <button className="bg-violet-800 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition">
          Edit
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
