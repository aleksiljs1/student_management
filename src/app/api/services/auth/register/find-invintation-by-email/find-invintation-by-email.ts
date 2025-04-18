import prisma from "@/lib/prisma";

export async function findInvitationByEmail(email: string) {
  return prisma.invitation.findUnique({
    where: { email },
  });
}
