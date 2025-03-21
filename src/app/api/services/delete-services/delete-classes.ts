import prisma from "@/lib/prisma";

export class DeleteClass {
  async deleteClass(id: string) {
    return await prisma.class.delete({
      where: {
        id : Number(id),
      }
    });

  }
}