import prisma from "@/lib/prisma";

export class GpaStats {
  async getGpaData() {
    const students = await prisma.student.findMany({
      select: {
        student_id: true, 
        name: true,
        gpa: true,
      },
    });

    return students.map((student) => ({
      studentId: student.student_id,
      gpa: student.gpa,
      name: student.name,
    }));
  }
}
