import { NextResponse } from "next/server";
import { FacultyAllData } from "@/app/api/services/faculties/edit/get-edit/get-faculty-alldata";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ parseparams: string }> },
) {
  const { parseparams } = await params;
  const facultyService = new FacultyAllData();

  try {
    const allData = await facultyService.getFacultyAllData(parseparams);
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to faculty service", error },
      { status: 401 }, //change status
    );
  }
}