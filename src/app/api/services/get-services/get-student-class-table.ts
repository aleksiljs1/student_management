//studentTable

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class StudentTable {



  async getStudentTable(id: string | null, page: number, pageSize: number, search?: string,){
    const skip = (page - 1) * pageSize;

    const Searching: Prisma.StudentWhereInput = search
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
    const [studentClass, totalClasses] = await Promise.all([
    prisma.student.findMany({
      skip,
      take: pageSize,
      where: {
        AND :[{ student_class_id: parseInt(id)}, Searching,],
      },
      select: {
        name: true ,
        surname: true,
        gpa:true,
        student_id: true,

      student_class:{
        select: {
          name: true,
          year: true,
          id: true,

        },

        },
        faculty: {
          select: {
            name: true,
          }
        },
      }
    }),
      prisma.student.count({
        where: {
          AND :[{ student_class_id: parseInt(id)} ]
        }
      })
      ])
    const totalPages = Math.ceil(totalClasses / pageSize);


return { students: studentClass , totalPages, currentPage: page };

  }
}