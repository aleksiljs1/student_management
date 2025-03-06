import prisma from "@/lib/prisma";

export class AllUniversityService {
  async getAllUniversity() {

    return await prisma.faculty.findMany({
      include: {
        classes: {
          include: {
            students: true,
            //reference the student array inside of faculty instead of the table students, remember when nesting
          },
        },
      },
    })
  }}