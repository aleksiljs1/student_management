import { NextResponse } from "next/server";
import { EditStudent } from "@/app/api/services/edit-services/edit-student";

export async function PUT(request: Request, { params }: { params: { parseparams: string } }) {
  try {
    const {  Name, Surname, gpa, faculty, Classes } = await request.json();
    const {parseparams} =  params;

    const editStudent = new EditStudent();
    const editedStudent = await editStudent.getAllStudents(
      parseparams,
      Name,
      Surname,
      gpa,
      faculty,
      Classes,
    );

    return NextResponse.json(
      { message: "Student edited successfully!", student: editedStudent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding student", error },
      { status: 500 },
    );
  }
}
