import prisma from "@/lib/prisma";

export async function getStudents(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const students = await prisma.student.findMany({
    skip,
    take: pageSize,
    include: {
      faculty: true,
      student_class: true,
    },
  });

  const totalStudents = await prisma.student.count();
  const totalPages = Math.ceil(totalStudents / pageSize);

  return { students, totalPages, currentPage: page };
}