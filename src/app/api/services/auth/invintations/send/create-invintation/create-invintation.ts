import prisma from "@/lib/prisma";

export async function createInvitation(
  email: string,
  token: string,
  expiresAt: Date,
  createdByUserId: number
) {
  return prisma.invitation.create({
    data: {
      email,
      token,
      expiresAt,
      createdByUserId,
    },
  });
}