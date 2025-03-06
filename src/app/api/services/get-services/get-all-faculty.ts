import prisma from "@/lib/prisma";

export class FacultyService {
  async getAllFaculty() {
    return await prisma.faculty.findMany({});
  }
}