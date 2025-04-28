import prisma from "../../../../../../../../UniversityMenagementSystem/src/lib/prisma";

export async function findUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: { username },
  });
}
