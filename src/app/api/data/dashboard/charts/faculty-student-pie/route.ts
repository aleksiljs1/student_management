import { NextResponse } from "next/server";
import { FacultyStudentStats } from "@/app/api/services/get-services/get-faculty-student-graph";


export async function GET() {
  try {
    const stats = new FacultyStudentStats();
    const data = await stats.getStudentCountsPerFaculty();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching faculty :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
