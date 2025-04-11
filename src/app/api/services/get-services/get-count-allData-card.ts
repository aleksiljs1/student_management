import prisma from "@/lib/prisma";

export class CountAll {
  async getCounts() {
    const studentCount = await prisma.student.count();
    const classCount = await prisma.class.count();
    const facultyCount = await prisma.faculty.count();

    return {
      students: studentCount,
      classes: classCount,
      faculties: facultyCount,
    };
  }
}