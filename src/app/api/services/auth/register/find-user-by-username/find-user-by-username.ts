import prisma from "@/lib/prisma";

export async function findUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: { username },
  });
}
