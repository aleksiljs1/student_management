import { NextResponse } from "next/server";
import { DeleteStudent } from "@/app/api/services/students/delete/delete-student";

export async function DELETE(request: Request, { params }: { params: { parseparams: string } }) {
  try {
    const { parseparams } = params;
    const studentId = new DeleteStudent();
    const deletedStudent = await  studentId.deleteStudent(parseparams);

    return NextResponse.json(
      { message: "Student deleted successfully!", student: deletedStudent },
      { status: 201 },
    );

  } catch (error) {
    NextResponse.json({ message: "Something went wrong!", error: error }, {status: 500});
  }
}
