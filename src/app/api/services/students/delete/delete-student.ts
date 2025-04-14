import prisma from "@/lib/prisma";

export class DeleteStudent {
  async deleteStudent(id: string) {
    return await prisma.student.delete({
      where: {
        student_id: Number(id),
      },
    });
  }
}
