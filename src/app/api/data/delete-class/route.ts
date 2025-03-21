import { NextResponse } from "next/server";
import { DeleteClass } from "@/app/api/services/delete-services/delete-classes";

export async function POST(request:Request){
  try {
    const { classId } = await request.json();
    const classesId = new DeleteClass()
    await classesId.deleteClass(classId);

    return NextResponse.json(
      {message: "Faculty has been successfully deleted!"},
      {status: 201}
    )
  } catch (error) {
    NextResponse.json({message: "something went wrong", error: error} ,{status: 500});
  }
}