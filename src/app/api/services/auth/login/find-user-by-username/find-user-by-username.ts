import prisma from "@/lib/prisma";

export async function findUserByUsername(userName: string) {
  return prisma.users.findUnique({
    where: { username: userName },
  });
}

