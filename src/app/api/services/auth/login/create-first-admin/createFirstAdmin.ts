import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createFirstAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // await new SignJWT({ id: admin.id })
  //   .setProtectedHeader({ alg: "HS256" })
  //   .setIssuedAt()
  //   .setExpirationTime("7d")
  //   .sign(new TextEncoder().encode(SECRET_KEY));

  return await prisma.users.create({
    data: {
      username: "adminAccount@gmail.com",
      password_hash: hashedPassword,
    },
  });
}