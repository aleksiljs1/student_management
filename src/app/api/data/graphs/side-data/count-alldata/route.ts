import { NextResponse } from "next/server";
import { CountAll } from "@/app/api/services/graph/data/student-count/get-count-allData-card";

export async function GET() {
  try {
    const stats = new CountAll();
    const data = await stats.getCounts();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
