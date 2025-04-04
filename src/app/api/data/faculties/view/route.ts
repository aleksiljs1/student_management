import { NextResponse } from "next/server";
import { FacultiesTable } from "@/app/api/services/get-services/get-faculty-table";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const query = searchParams.get("query") || "";

  const facultiesTable = new FacultiesTable();

  try {
    const result = await facultiesTable.getFacultiesTable(page, pageSize, query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
