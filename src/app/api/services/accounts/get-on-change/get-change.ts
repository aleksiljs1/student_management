import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function updateUserRole(userId: number, newRole: string) {
  return prisma.users.update({
    where: { id: userId },
    data: {
      role: newRole as Role
    },
    select: {
      id: true,
      username: true,
      role: true,
      created_at: true
    }
  });
}