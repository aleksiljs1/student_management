import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export class FacultiesTable {
  async getFacultiesTable(page: number, pageSize: number, search?: string) {
    const skip = (page - 1) * pageSize;

    const Searching: Prisma.FacultyWhereInput = search
      ? {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }
      : {};

    const [faculties, totalFaculties] = await Promise.all([
      prisma.faculty.findMany({
        skip,
        take: pageSize,
        where: Searching,
        select: {
          id: true,
          name: true,
          head_of_faculty: true,
          students: {
            select: {
              gpa: true,
            },
          },
          classes: {
            select: {
              id: true,
            },
          },
        },
      }),
      prisma.faculty.count({ where: Searching }),
    ]);

    const facultyArray = faculties.map((faculty) => {
      const count = faculty.students.length;
      let sum = 0;
      for (const student of faculty.students) {
        sum += student.gpa;
      }
      const avgGpa = sum / count;

      const sortedGpa = faculty.students
        .map((student) => student.gpa)
        .sort((a, b) => a - b);

      const median = count > 0 ? sortedGpa[Math.ceil(count / 2) - 1] : 0; // -1 is since an arrays first  position is 0

      return {
        id: faculty.id,
        name: faculty.name,
        headOfFaculty: faculty.head_of_faculty,
        avgGpa: avgGpa,
        medianGpa: median,
        numOfClasses: faculty.classes.length,
      };
    });

    const totalPages = Math.ceil(totalFaculties / pageSize);

    return { data: facultyArray, totalPages, currentPage: page };
  }
}
