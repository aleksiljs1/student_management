
import { NextResponse } from "next/server";
import { GpaStats } from "@/app/api/services/graph/scatter/all-gpa/get-ScatterPlot-data";

export async function GET() {
  try {
  const stats = new GpaStats();
  const result = await stats.getGpaData();
  return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  }

