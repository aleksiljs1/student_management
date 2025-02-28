import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { Name, Surname, gpa, faculty, Classes } = await request.json();
    //will need to fix variable-naming after it ensuring it works but for now i just whant it to run

    const newStudent = await prisma.student.create({
      data: {
        name: Name,
        surname: Surname,
        gpa: parseFloat(gpa),
        faculty_id: Number(faculty),
        student_class_id: Number(Classes),
      },
    }); // 99% sure the problem is the type going in.
    //sent them as numbers and float and worked ,was correct
    return NextResponse.json(
      { message: "Student added successfully!", student: newStudent },
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
