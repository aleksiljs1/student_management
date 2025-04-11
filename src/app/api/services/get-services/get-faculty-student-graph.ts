import prisma from "@/lib/prisma";

export class FacultyStudentStats {
  async getStudentCountsPerFaculty() {
    const studentCounts = await prisma.student.groupBy({
      by: ["faculty_id"],
      _count: {
        student_id: true,
      },
    });

    const result = await Promise.all(
      studentCounts.map(async (entry) => {
        const faculty = await prisma.faculty.findUnique({
          where: {
            id: entry.faculty_id,
          },
          select: {
            name: true,
          },
        });

        return {
          facultyName: faculty?.name || "Unknown",
          studentCount: entry._count.student_id,
        };
      })
    );

    return result;
  }
}
