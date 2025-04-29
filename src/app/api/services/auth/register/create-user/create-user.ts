import prisma from "@/lib/prisma";


export async function createUser(userName: string, password: string) {

  return prisma.users.create({
    data: {
      username: userName,
      password_hash: password,
      role: "USER"
    },
  });
}


