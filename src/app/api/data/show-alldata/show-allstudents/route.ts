import { NextResponse } from "next/server";
import { getStudents } from "@/app/api/services/show-alldata/show-all-students/get-student-table";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || '';
  const pageSize = 10;

  try {
    const data = await getStudents(page, pageSize, query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}