import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { SECRET_KEY } from "@/lib/user-store";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { userName, password } = await request.json();

  const userExists = await prisma.users.findUnique({
    where: { username: userName },
  });

  if (!userExists) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 400 },
    );
  }

  const isMatch = await bcrypt.compare(password, userExists.password_hash);
  if (isMatch) {
    const token = await new SignJWT()
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(SECRET_KEY));



    return NextResponse.json({ message: "You have logged in!", token });
  } else {
    return NextResponse.json(
      { message: "Mismatching password" },
      { status: 400 },
    );
  }
}
