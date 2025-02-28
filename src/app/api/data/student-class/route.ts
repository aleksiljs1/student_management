import { ClassService } from "@/app/api/services/student.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const classService = new ClassService();

  try {
    const allclass = await classService.getAllClass();
    return NextResponse.json(allclass);
  } catch (error) {
    return NextResponse.json(
      { message: "error related to class service" },
      { status: 401 },
    );
  }
}
