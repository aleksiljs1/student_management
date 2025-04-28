import prisma from "@/lib/prisma";

export async function markInvitationUsed(invitationId: number) {
  return prisma.$transaction(async (prisma) => {
    const invitation = await prisma.invitation.findUniqueOrThrow({
      where: { id: invitationId },
    });

    await prisma.invitationLog.create({
      data: {
        email: invitation.email,
        token: invitation.token,
        createdByUserId: invitation.createdByUserId,
        createdAt: invitation.createdAt,
        expiresAt: invitation.expiresAt,
      }
    });

    return prisma.invitation.delete({
      where: { id: invitationId },
    });
  });
}