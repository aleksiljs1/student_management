import { NextResponse } from "next/server";
import { EditFacultyService } from "@/app/api/services/edit-services/edit-faculty";

export async function PUT(request: Request, { params }: { params: { parseparams: string } }) {
  try {
    const { Name, HeadOfFaculty} = await request.json();
    const { parseparams } = params;

    const editFaculty = new EditFacultyService();
    const editedFaculty = await editFaculty.getAllFaculties(
      parseparams,
      Name,
      HeadOfFaculty,
    );//i need to rename method later after

    return NextResponse.json(
      { message: "Faculty edited successfully!", faculty: editedFaculty },
      { status: 201 },
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error editing faculty", error },
      { status: 500 },
    );
  }
}
