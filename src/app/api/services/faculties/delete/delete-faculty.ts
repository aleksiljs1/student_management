import prisma from "@/lib/prisma";

export class DeleteFaculty {
  async deleteFaculty(id: string) {
    return await prisma.faculty.delete({
      where: {
        id : Number(id),
      }
    });
  }
}