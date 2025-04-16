import prisma from "@/lib/prisma";

export const userService = {
  async findUserByVerifyToken(token: string) {
    if (!token) return null;

    return await prisma.users.findFirst({
      where: {
        verifyToken: token,
        verifyExpiry: { gt: new Date() },
      },
    });
  },

  async markUserAsVerified(userId: number) {
    return await prisma.users.update({
      where: { id: userId },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyExpiry: null,
      },
    });
  },
};