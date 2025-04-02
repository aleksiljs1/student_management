import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export class ClassesTable {
  async getClassesTable(
    id: string | null,
    page: number,
    pageSize: number,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;

    const Searching: Prisma.ClassWhereInput = search
      ? {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }
      : {};

    if (id == null) {
      return { classes: [], totalPages: 0 };
    }

    const [classes, totalClasses] = await Promise.all([
      prisma.class.findMany({
        skip,
        take: pageSize,
        where: {
          AND: [{ faculty_id: parseInt(id) }, Searching],
        },
        select: {
          name: true,
          year: true,
          students: {
            select: {
              gpa: true,
            },
          },
          faculty: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.class.count({
        where: {
          AND: [{ faculty_id: parseInt(id) }, Searching],
        },
      }),
    ]);

    const classesDto = classes.map((currentClass) => {
      const studentCount = currentClass.students.length;
      let gpaSum = 0;

      for (const student of currentClass.students) {
        gpaSum += student.gpa;
      }
      const avgGpa = gpaSum / studentCount;

      const sortedGpas = currentClass.students
        .map((student) => student.gpa)
        .sort((a, b) => a - b);

      const medianGpa = sortedGpas[Math.ceil(studentCount / 2) - 1];

      return {
        className: currentClass.name,
        classYear: currentClass.year,
        numOfStudents: studentCount,
        avgGpa,
        medianGpa,
        facultyName: currentClass.faculty.name,
      };
    });

    const totalPages = Math.ceil(totalClasses / pageSize);

    return { classes: classesDto, totalPages, currentPage: page };
  }
}
