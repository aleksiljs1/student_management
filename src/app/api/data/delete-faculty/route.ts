import { NextResponse } from "next/server";
import { DeleteFaculty } from "@/app/api/services/delete-services/delete-faculty";

export async function POST(request:Request){
  try {
    const { facultyId } = await request.json();
    const facultiesId = new DeleteFaculty()
    await facultiesId.deleteFaculty(facultyId);

    return NextResponse.json(
      {message: "Faculty has been successfully deleted!"},
      {status: 201}
    )
  } catch (error) {
    NextResponse.json({message: "something went wrong", error: error});
  }
}