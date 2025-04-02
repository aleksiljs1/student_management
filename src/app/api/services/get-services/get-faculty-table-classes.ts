import prisma from "@/lib/prisma";

export class FacultyTableData {
  async getFacultyTableData(id: string) {

    const faculty = await prisma.faculty.findUnique({
      where: { id: parseInt(id) },
      select: {
        name: true,
        classes: {
          select: {
            name: true,
            year: true,
            students: {
              select: {
                gpa: true,
              },
            },
          },
        },
      },
    });


    if (!faculty) {
      return { classes: [] };
    }


    const classData = faculty.classes.map((classItem) => {
      const studentCount = classItem.students.length;


      let gpaSum = 0;
      for (const student of classItem.students) {
        gpaSum += student.gpa;
      }
      const avgGpa = studentCount > 0 ? gpaSum / studentCount : 0;


      const sortedGpas = classItem.students
        .map(student => student.gpa)
        .sort((a, b) => a - b);

      const medianGpa =
        studentCount > 0
          ? sortedGpas[Math.ceil(studentCount / 2) - 1]
          : 0;

      return {
        className: classItem.name,
        classYear: classItem.year,
        numOfStudents: studentCount,
        avgGpa,
        medianGpa,
      };
    });

    return { classes: classData };
  }
}
