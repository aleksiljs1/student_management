import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CreateFaculty } from "@/app/api/services/create-services/create-faculty";

export async function POST(request: Request) {
  try {
    const { facultyName, facultyHead } = await request.json();
    const createFaculty = new CreateFaculty();
    const createdFaculty = createFaculty.createdFaculty(
      facultyName,
      facultyHead,
    );

    return NextResponse.json(
      {
        message: "faculty has been added successfully!",
        faculty: createdFaculty,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding faculty ", error },
      { status: 500 },
    );
  }
}
