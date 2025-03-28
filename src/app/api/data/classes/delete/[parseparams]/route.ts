import { NextResponse } from "next/server";
import { DeleteClass } from "@/app/api/services/delete-services/delete-classes";

export async function DELETE(request: Request, { params }: { params: { parseparams: string } }){
  try {
    const { parseparams } = params;
    const classesId = new DeleteClass()
    await classesId.deleteClass(parseparams);

    return NextResponse.json(
      {message: "Faculty has been successfully deleted!"},
      {status: 201}
    )
  } catch (error) {
    NextResponse.json({message: "something went wrong", error: error} ,{status: 500});
  }
}