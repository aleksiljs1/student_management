import { NextResponse } from "next/server";
import { FacultyService } from "@/app/api/services/get-services/get-all-faculty";

export async function GET(request: Request) {
  const facultyService = new FacultyService();

  try {
    const faculties = await facultyService.getAllFaculty();

    return NextResponse.json(faculties);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to faculty service", error: error },
      { status: 401 },
    );
  }
}
