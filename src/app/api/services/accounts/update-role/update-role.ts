
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function updateUserRoleById(userId: number, newRole: Role) {
  return prisma.users.update({
    where: { id: userId },
    data: { role: newRole },
  });
}
