import prisma from "@/lib/prisma";

export async function markInvitationUsed(invitationId: number) {
  return prisma.invitation.update({
    where: { id: invitationId },
    data: { usedAt: new Date() },
  });
}