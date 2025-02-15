
import { Student } from "@/models/Student";
import Image from "next/image";



interface Cardprops{
    student: Student;
}


function Card({student}: Cardprops) {
    return ( <div className="card">
        <img src= "/src/images/Student.png" className="card-image" alt="picture" />
        <h2 className="card-title">{student.studentName} {student.surname}</h2>
        <p className="card-text"> <b>id </b>: {student.student_id} </p>
        <p className="card-text"> <b>gpa</b> : {student.gpa} </p>
        <button className="button" >Edit User</button>

    </div>)
}

 export default Card;