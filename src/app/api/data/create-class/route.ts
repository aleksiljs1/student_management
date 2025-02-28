import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST( request:Request) {
  try {
  const { className, sendFaculty, year } = await request.json();

    const myNewClass = await prisma.class.create({
      data: {
        name: className,
        year: Number(year),
        faculty_id: Number(sendFaculty)
      }

    })
  return NextResponse.json(
    {message:"Class has been added successfully!", class: myNewClass},
    {status: 200}
  )
}
catch (error) {
  return NextResponse.json(
    {message:"Error adding class ", error },
  {status: 500}
  )

}
  }