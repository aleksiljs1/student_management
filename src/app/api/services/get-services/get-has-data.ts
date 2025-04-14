import prisma from "@/lib/prisma";


export class FacultyChecker {
  async hasFaculty(): Promise<boolean> {
     return false;
    const faculties = await prisma.faculty.findMany({
      take: 1,
      select: { id: true },
    });

    return faculties.length > 0;
  }
}
