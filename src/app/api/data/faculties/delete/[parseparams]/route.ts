import { NextResponse } from "next/server";
import { DeleteFaculty } from "@/app/api/services/faculties/delete/delete-faculty";

export async function DELETE(request: Request, { params }: { params: { parseparams: string } }) {
  try {
    const { parseparams } = params;
    const facultiesId = new DeleteFaculty()
    await facultiesId.deleteFaculty(parseparams);

    return NextResponse.json(
      {message: "Faculty has been successfully deleted!"},
      {status: 201}
    )
  } catch (error) {
    NextResponse.json({message: "something went wrong", error: error});
  }
}