import { SECRET_KEY } from "@/lib/user-store";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StudentService } from "@/app/api/services/student.service";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const type = request.headers.get("type");
  console.log(type);

  if (!authHeader) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET_KEY);
    const studentService = new StudentService();
    const students = await studentService.getAllStudents();

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized token" },
      { status: 401 },
    );
  }
}
