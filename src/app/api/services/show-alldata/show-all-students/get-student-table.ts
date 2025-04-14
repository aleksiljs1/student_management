
import { Prisma} from '@prisma/client';
import prisma from "@/lib/prisma";

export async function getStudents(page: number, pageSize: number, search?: string) {
  const skip = (page - 1) * pageSize;

  const Searching: Prisma.StudentWhereInput = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { surname: { contains: search, mode: 'insensitive' } },
    ],
  } : {};

  const [students, totalStudents] = await Promise.all([
    prisma.student.findMany({
      skip,
      take: pageSize,
      where: Searching,
      include: {
        faculty: true,
        student_class: true,
      },
    }),
    prisma.student.count({ where: Searching }),
  ]);

  const totalPages = Math.ceil(totalStudents / pageSize);

  return { students, totalPages, currentPage: page };
}