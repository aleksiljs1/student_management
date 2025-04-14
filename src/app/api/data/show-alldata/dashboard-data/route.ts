import { NextResponse } from "next/server";
import { AllUniversityService } from "@/app/api/services/get-services/get-all-data";

export async function GET() {
  const sendAllData = new AllUniversityService();
  try {
    const AllData = await sendAllData.getAllUniversity();
    return NextResponse.json(AllData);
  } catch (error) {
    return NextResponse.json(
      {
        message: "error related to the faculty table sending all side-data",
        error: error,
      },
      { status: 400 },
    );
  }
}
