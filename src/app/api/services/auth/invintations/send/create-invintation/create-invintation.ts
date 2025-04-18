import prisma from "@/lib/prisma";


export async function createInvitation(email: string, token: string, expiresAt: Date) {
  return prisma.invitation.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
}