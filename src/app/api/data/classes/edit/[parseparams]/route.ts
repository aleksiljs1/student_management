import { NextResponse } from "next/server";
import { EditClass } from "@/app/api/services/edit-services/edit-class";



export async function PUT(request: Request, { params }: { params: { parseparams: string } }) {
  try {
    const { className, year, faculty } = await request.json();
    const { parseparams } = params;

    const editClass = new EditClass();
    const editedClass = await editClass.updateClass(parseparams, className, year, faculty);

    return NextResponse.json(
      { message: "Class updated successfully!", editedClass },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating class", error },
      { status: 500 }
    );
  }
}