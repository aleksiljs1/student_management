
import { NextResponse } from "next/server";
import { StudentTable } from "@/app/api/services/get-services/get-student-class-table";

export async function GET(
  request: Request,
  { params }: { params: { parseparams: string } }
) {
  const { parseparams } = await params;
  const { searchParams } = new URL(request.url);


  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const query = searchParams.get("query") || "";


  const classtable = new StudentTable;

  try {
    const result = await classtable.getStudentTable(parseparams,page, pageSize, query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }

}
