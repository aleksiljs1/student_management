import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
try{
  const { student } = await request.json();

  const deletedStudent = await prisma.student.delete({
    where: {
      student_id: student,
    },
  })
return NextResponse.json(
  {message: "Student deleted successfully!", student: deletedStudent },
  {status:201},)
  //placeholder status for now
  } catch (error){
  NextResponse.json({message: "Something went wrong!", error: error});

    }
}