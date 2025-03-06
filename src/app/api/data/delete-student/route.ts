import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DeleteStudent } from "@/app/api/services/delete-services/delete-student";


export async function POST(request: Request) {
try{
  const { student } = await request.json();
  const studentId = new DeleteStudent
  const deletedStudent = studentId.deleteStudent(student)

return NextResponse.json(
  {message: "Student deleted successfully!", student: deletedStudent },
  {status:201},)
  //placeholder status for now
  } catch (error){
  NextResponse.json({message: "Something went wrong!", error: error});

    }
}