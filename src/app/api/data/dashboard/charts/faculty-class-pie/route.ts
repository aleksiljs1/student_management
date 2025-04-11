
import { NextResponse } from "next/server";
import { FacultyCountClassesStats } from "@/app/api/services/get-services/get-faculty-classes-pie";

export async function GET() {
  try {
  const stats = new FacultyCountClassesStats();
  const result = await stats.getClassCountPerFaculty();
  return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  }

