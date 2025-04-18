import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function findInvitationByEmail(email: string) {
  return prisma.invitation.findUnique({
    where: { email },
  });
}

export function isInvitationExpired(invitation: { expiresAt: Date }) {
  return invitation.expiresAt < new Date();
}

export async function findUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: { username },
  });
}

export async function createUser(userName: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.users.create({
    data: {
      username: userName,
      password_hash: hashedPassword,
    },
  });
}


