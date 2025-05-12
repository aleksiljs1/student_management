import prisma from "@/lib/prisma";

export async function updateUserCredentials(userId: number, updateData: {
  username?: string;
  password_hash?: string;
}) {
  return prisma.users.update({
    where: { id: userId },
    data: updateData,
  });
}