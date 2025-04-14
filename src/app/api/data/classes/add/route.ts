import { NextResponse } from "next/server";
import { CreateClass } from "@/app/api/services/classes/add/create-class";

export async function POST(request: Request) {
  try {
    const { className, sendFaculty, year } = await request.json();
    const createClass = new CreateClass();
    const myNewClass =  await  createClass.createdClass(className, sendFaculty, year);

    return NextResponse.json(
      { message: "Class has been added successfully!", class: myNewClass },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding class ", error },
      { status: 500 },
    );
  }
}
