import { NextResponse } from "next/server";
import { ClassService } from "@/app/api/services/students/edit/assighn-student-class/student-class/classes-for-faculty";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ parseparams: string }> },
) {
  const { parseparams } = await params;
  const classService = new ClassService();
  try {
    const allclass = await classService.getClassesForFaculty(parseparams);
    return NextResponse.json(allclass);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to class service", error  },
      { status: 401 },
    );
  }
}
