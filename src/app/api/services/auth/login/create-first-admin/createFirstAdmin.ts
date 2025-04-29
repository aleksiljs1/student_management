import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createFirstAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  return prisma.users.create({
    data: {
      username: "adminAccount@gmail.com",
      password_hash: hashedPassword,
      role: "ADMIN",
    },
  });
}