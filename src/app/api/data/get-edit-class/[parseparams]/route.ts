import { NextResponse } from "next/server";
import { ClassesAllData } from "@/app/api/services/get-services/get-classes-alldata";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ parseparams: string }> },
) {
  const { parseparams } = await params;
  const classesService = new ClassesAllData();

  try {
    const allData = await classesService.getclassesAllData(parseparams);
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to faculty service", error },
      { status: 401 },
    );
  }
}
