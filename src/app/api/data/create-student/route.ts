import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CreateStudent } from "@/app/api/services/create-services/create-student";


export async function POST(request: Request) {
  try {
    const { Name, Surname, gpa, faculty, Classes } = await request.json();

    const createStudent = new CreateStudent();
    const newStudent =  createStudent.CreatedStudent(Name, Surname, gpa, faculty, Classes)
    return NextResponse.json(
      { message: "Student added successfully!", student: newStudent },
      { status: 201 },
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error adding student", error },
      { status: 500 },
    );

  }
}
