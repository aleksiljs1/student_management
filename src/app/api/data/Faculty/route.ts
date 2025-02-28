import {
  FacultyService,
  StudentService,
} from "@/app/api/services/student.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const facultyService = new FacultyService();

  try {
    const faculties = await facultyService.getAllFaculty();

    return NextResponse.json(faculties);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to faculty service" },
      { status: 401 },
    );
  }
}
