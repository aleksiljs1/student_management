import prisma from "@/lib/prisma";

export class CreateClass {
  async createdClass(className: string, sendFaculty: string, year: string) {
    return await prisma.class.create({
      data: {
        name: className,
        year: Number(year),
        faculty_id: Number(sendFaculty),
      },
    });
  }
}
