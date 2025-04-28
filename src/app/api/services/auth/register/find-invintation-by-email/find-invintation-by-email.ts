import prisma from "../../../../../../../../UniversityMenagementSystem/src/lib/prisma";

export async function findInvitationByEmail(email: string) {
  return prisma.invitation.findUnique({
    where: { email },
  });
}
