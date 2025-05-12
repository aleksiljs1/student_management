import prisma from "@/lib/prisma";

export async function getUserRoleById(userId: number) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role || "USER";
}
