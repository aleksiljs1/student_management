
import { NextResponse } from "next/server";
import { StudentsAllData } from "@/app/api/services/get-services/get-all-student-data";


export async function GET(request: Request, { params }: { params: Promise<{ parseparams: string }> }) {

  const { parseparams } = await params
  const studentService = new StudentsAllData();

  try {
    const allData = await studentService.getStudentsAllData(parseparams)
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to class service", error},
      { status: 401 },//change status
    );
  }
}