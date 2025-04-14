import prisma from "@/lib/prisma";

export class ClassService {
  async getAllClass() {
    return await prisma.class.findMany({});
  }
  async getClassesForFaculty(facultyId: string) {
    const parsedFacultyId = parseInt(facultyId);
    return await prisma.class.findMany({
      where: {
        faculty_id: parsedFacultyId,
      },
    });
  }
}
