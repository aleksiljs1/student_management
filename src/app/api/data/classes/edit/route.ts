import { NextResponse } from "next/server";
import { EditClass } from "@/app/api/services/edit-services/edit-class";

export async function POST(request: Request) {
  try {
    const { id, className, year, faculty} = await request.json();
    const editClass = new EditClass();
    const editedClass = await editClass.updateClass(
      id,
      className,
      year,
      faculty,
    );

    return NextResponse.json(
      { message: "Class edited successfully!",editedClass},
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error editing class", error },
      { status: 500 },
    );
  }
}
