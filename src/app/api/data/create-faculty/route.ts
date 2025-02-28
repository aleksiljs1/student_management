import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST( request:Request) {
  try {
    const { facultyName, facultyHead, } = await request.json();

    const myNewFaculty = await prisma.faculty.create({
      data: {
        name: facultyName,
        head_of_faculty: facultyHead,
      }
    })
    return NextResponse.json(
      {message:"Faculty has been added successfully!", faculty: myNewFaculty},
      {status: 200}
    )
  }
  catch (error) {
    return NextResponse.json(
      {message:"Error adding faculty ", error },
      {status: 500}
    )
  }
}