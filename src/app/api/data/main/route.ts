import { NextResponse } from "next/server";
import { FacultyChecker } from "@/app/api/services/get-services/get-has-data";


export async function GET() {
  try {
    const checker = new FacultyChecker();
    const hasFaculty = await checker.hasFaculty();

    return NextResponse.json({ hasFaculty });
  } catch (error) {
    console.error("Faculty check failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
