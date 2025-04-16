import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterUser } from "@/app/api/services/auth/register/create-user";

export async function POST(request: Request) {
  const { userName, password } = await request.json();

  const userExists = await prisma.users.findUnique({
    where: { username: userName },
  });

  if (userExists) {
    return NextResponse.json(
      { message: "Username already taken" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = crypto.randomBytes(32).toString("hex");
  const verifyExpiry = new Date(Date.now() + 3600 * 1000); // 1 hour

  const createUser = new RegisterUser()

  await createUser.createUser(userName,hashedPassword,verifyToken,verifyExpiry)



  await sendVerificationEmail(userName, verifyToken);

  return NextResponse.json({
    message: "Registration successful! Please check your email to verify your account."
  });
}