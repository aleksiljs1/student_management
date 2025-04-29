import { SignJWT } from "jose";
import { SECRET_KEY } from "@/lib/user-store";
import prisma from "@/lib/prisma";

export async function generateJwtToken(id: number) {

  const role = prisma.users.findUnique({
    where: { id },
    select: { role: true }, });


  return new SignJWT({ id, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(SECRET_KEY));
}
