import { NextResponse } from "next/server";
import { EditFacultyService } from "@/app/api/services/edit-services/edit-faculty";

export async function POST(request: Request) {
  try {
    const { id, Name, HeadOfFaculty} = await request.json();

    const editFaculty = new EditFacultyService();
    const editedStudent = await editFaculty.getAllFaculties(
      id,
      Name,
      HeadOfFaculty,
    );

    return NextResponse.json(
      { message: "Faculty edited successfully!", student: editedStudent },
      { status: 201 },
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error editing faculty", error },
      { status: 500 },
    );
  }
}
