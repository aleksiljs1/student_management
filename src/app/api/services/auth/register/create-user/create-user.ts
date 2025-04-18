import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";



export async function createUser(userName: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);// will have to move back to endpoint and pass hashed string
  return prisma.users.create({
    data: {
      username: userName,
      password_hash: hashedPassword,
    },
  });
}


