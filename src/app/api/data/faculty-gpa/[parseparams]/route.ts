import { getGpaInFaculty } from "@/app/api/services/get-services/faculty-gpa-service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ parseparams: string }> },
){
  try {
    const { parseparams } = await params;
    const data = await getGpaInFaculty(parseparams)
    return NextResponse.json(data)
  }catch(err){
    NextResponse.json(
      {message: "Error Fetching faculty data.", err },
      {status: 500}
    )
  }

}