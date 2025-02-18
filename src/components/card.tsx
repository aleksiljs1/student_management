import { Student } from "@/app/api/student-data/models/Student";
import Image from "next/image";
import ProfilePic from "../images/Student.png";

interface Cardprops {
  student: Student;
}

function Card({ student }: Cardprops) {
  return (
    <div className="card">
      <Image src={ProfilePic} className="card-image" alt="picture" />
      <h2 className="card-title">
        {student.studentName} {student.surname}
      </h2>
      <p className="card-text">
        {" "}
        <b>id </b>: {student.student_id}{" "}
      </p>
      <p className="card-text">
        {" "}
        <b>gpa</b> : {student.gpa}{" "}
      </p>
      <button className="button">Edit User</button>
    </div>
  );
}

export default Card;
