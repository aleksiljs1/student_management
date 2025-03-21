import { NextResponse } from "next/server";
import { EditStudent } from "@/app/api/services/edit-services/edit-student";

export async function POST(request: Request) {
  try {
    const { id, Name, Surname, gpa, faculty, Classes } = await request.json();

    const editStudent = new EditStudent();
    const editedStudent = await editStudent.getAllStudents(
      id,
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
