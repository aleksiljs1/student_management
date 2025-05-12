import prisma from "@/lib/prisma";

export async function createInvitation(
  email: string,
  token: string,
  expiresAt: Date,
  createdByUserId: number
) {

  await prisma.users.update({
    where: { id: createdByUserId },
    data: { inviteCount: { increment: 1 } }
  });

  return prisma.invitation.create({
    data: {
      email,
      token,
      expiresAt,
      createdByUserId,
    },
  });
}