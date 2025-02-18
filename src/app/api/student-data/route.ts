import { SECRET_KEY,} from "@/lib/user-store";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import students from "@/app/api/student-data/models/students";

export async function GET(request: Request) {

  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
try {
  jwt.verify(token, SECRET_KEY);
  return NextResponse.json(students)
}
catch (error) {
  return NextResponse.json(
    {message: "Unauthorized token" },
    {status:401}
  )
}
}
