import { NextResponse } from "next/server";
import { ClassesTable } from "@/app/api/services/faculties/view/classes/get-faculty-table-classes";



export async function GET(
  request: Request,
  { params }: { params: { parseparams: string } }
) {
  const { parseparams } = await params;
  const { searchParams } = new URL(request.url);


  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const query = searchParams.get("query") || "";


  const classtable = new ClassesTable();

  try {
    const result = await classtable.getClassesTable(parseparams,page, pageSize, query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }

}
