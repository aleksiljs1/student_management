import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const { userName, password } = await request.json();


  const userExists = await prisma.users.findUnique({
    where: { username: userName },
    });

  if (userExists) {
    return NextResponse.json({ message: "Username already taken" }, { status: 400 });
      }


  const hashedPassword = await bcrypt.hash(password, 10);


  await prisma.users.create({
    data: {
      username: userName,
      password_hash: hashedPassword,
      },
    });


  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not set");
    }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secretKey));

  return NextResponse.json({ message: "User registered successfully!", token });
}
