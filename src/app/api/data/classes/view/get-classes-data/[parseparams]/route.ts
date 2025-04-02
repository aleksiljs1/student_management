import { NextResponse } from "next/server";
import { ClassesTable } from "@/app/api/services/get-services/get-faculty-table-classes";



export async function GET(
  request: Request,
  { params }: { params: { parseparams: string } }
) {
  const { parseparams } = await params;
  const { searchParams } = new URL(request.url);


  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const query = searchParams.get("query") || "";


  const Classtable = new ClassesTable();

  try {
    const result = await Classtable.getClassesTable(parseparams,page, pageSize, query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }

}
