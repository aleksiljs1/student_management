import prisma from "@/lib/prisma";

export class CheckAdminUser {
  async checkUserExist(): Promise<boolean> {
    const count = await prisma.users.count();
    return count >= 1;
    // return false
  }
}