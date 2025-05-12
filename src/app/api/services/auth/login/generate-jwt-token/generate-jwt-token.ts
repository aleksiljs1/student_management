import { SignJWT } from "jose";
import { SECRET_KEY } from "@/lib/user-store";
import prisma from "@/lib/prisma";

export async function generateJwtToken(id: number) {

  const user = await prisma.users.findUnique({
    where: { id },
    select: { role: true }, });

  if (!user) {
    throw new Error("User not found");
  }
  return new SignJWT({
    id,
    role: user.role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.SECRET_KEY));
}