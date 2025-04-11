import prisma from "@/lib/prisma";

export class EditFacultyService {
  async getAllFaculties(
    id: string,
    Name: string,
    FacultyHead: string,
  ) {
    return await prisma.faculty.update({
      where: {
        id: Number(id),
      },
      data: {
        name: Name,
        head_of_faculty: FacultyHead,
      },
    });
  }
}



