import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
console.log("back end token is ", token);

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const invitation = await prisma.invitation.findUnique({
    where: { token },
  });

  if (!invitation || invitation.expiresAt < new Date() || invitation.usedAt) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
// will make sepparate messages and sepparate them in 3 services or 1 usecase, im just generalizing them here
  return NextResponse.json({ valid: true });
}