import { NextResponse } from "next/server";
import { userService } from "@/app/api/services/auth/verify-email/veify";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const user = await userService.findUserByVerifyToken(token);

  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
  }

  await userService.markUserAsVerified(user.id);

  return NextResponse.json({ message: "Email verified successfully!" });
}
