import { ClassService, StudentsAllData } from "@/app/api/services/student.service";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request, { params }: { params: Promise<{ parseparams: string }> }) {

  const { parseparams } = await params
  const studentService = new StudentsAllData();

  try {
    const allData = await studentService.getStudentsAllData(parseparams)
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to class service",error: error.message },
      { status: 401 },//change status
    );
  }
}