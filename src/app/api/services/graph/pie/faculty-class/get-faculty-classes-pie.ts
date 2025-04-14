import prisma from "@/lib/prisma";

export class FacultyCountClassesStats {
  async getClassCountPerFaculty() {
    const faculties = await prisma.faculty.findMany({
      select: {
        name: true,
        classes: {
          select: { id: true },
        },
      },
    });

    return faculties.map((faculty) => ({
      facultyName: faculty.name,
      classCount: faculty.classes.length,
    }));
  }
}