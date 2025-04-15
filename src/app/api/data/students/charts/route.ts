import { NextResponse } from "next/server";
import { getGpaDistribution } from "@/app/api/services/graph/pie/gpa/get-graph-gpa";


export async function GET() {
  try {
    const distribution = await getGpaDistribution();
    return NextResponse.json(distribution);
  } catch (error) {
    console.error("Error fetching GPA distribution:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
