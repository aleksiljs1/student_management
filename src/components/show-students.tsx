import students from "@/models/students";
import Card from "@/components/Card";


function showStudents() {
    return <>
        {
            students.map(student => (<Card key={student.student_id} student={student}/>))
        }</>}
export default showStudents;