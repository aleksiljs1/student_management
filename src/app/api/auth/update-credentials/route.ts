import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SECRET_KEY } from "@/lib/user-store";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(request: Request) {

  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    const { newUsername, newPassword } = await request.json();
    const userId = payload.id as number;

    const updateData: {
      username?: string;
      password_hash?: string;
    } = {};


    if (newUsername) {
      const existingUser = await prisma.users.findUnique({
        where: { username: newUsername },
      });

      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json(
          { message: "Username already taken" },
          { status: 400 }
        );
      }
      updateData.username = newUsername;
    }

    if (newPassword) {
      updateData.password_hash = await bcrypt.hash(newPassword, 10);
    }


    if (Object.keys(updateData).length > 0) {
      await prisma.users.update({
        where: { id: userId },
        data: updateData,
      });
    }

    return NextResponse.json({ message: "Credentials updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}