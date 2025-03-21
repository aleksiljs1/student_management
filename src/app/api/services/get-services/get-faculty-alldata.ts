import prisma from "@/lib/prisma";



export class FacultyAllData {
  async getFacultyAllData(
    id: string,

  ) {
    const parsedUniversityId = parseInt(id)
    return await prisma.faculty.findUnique({
      where: {
        id: parsedUniversityId,
      },

    });
  }
}
