import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { EditStudent } from "@/app/api/services/edit-services/edit-student";

export async function POST(request: Request) {
  try {
    const { id ,Name, Surname, gpa, faculty, Classes } = await request.json();
    //will need to fix variable-naming after it ensuring it works but for now i just whant it to run
    const editStudent = new EditStudent;
    const editedStudent= editStudent.getAllStudents(id, Name, Surname, gpa, faculty, Classes)


    return NextResponse.json(
      { message: "Student edited successfully!", student: editedStudent },
      { status: 201 },
    );
    //take a look at database each time just to make sure
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding student", error },
      { status: 500 },
    );
    //server does not know why but there is a condition here which prevents it from fulfilling a request
  }
}
