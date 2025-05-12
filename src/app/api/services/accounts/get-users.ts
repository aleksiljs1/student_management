import prisma from "@/lib/prisma";

export async function getAllUsers() {
  return prisma.users.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      created_at: true,
      inviteCount: true,
    },
  });
}
