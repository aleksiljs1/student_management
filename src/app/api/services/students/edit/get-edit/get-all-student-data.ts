import prisma from "@/lib/prisma";

export class StudentsAllData {
  async getStudentsAllData(studentId: string) {
    const parsedStudentId = parseInt(studentId);
    return await prisma.student.findUnique({
      where: {
        student_id: parsedStudentId,
      },
      include: {
        faculty: true,
        student_class: true,
      },
    });
  }
}
