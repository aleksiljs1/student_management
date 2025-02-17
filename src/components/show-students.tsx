import students from "@/models/students";
import Card from "@/components/card";

function showStudents() {
  return (
    <>
      {students.map((student) => (
        <Card key={student.student_id} student={student} />
      ))}
    </>
  );
}
export default showStudents;
