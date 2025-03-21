import prisma from "@/lib/prisma";

export class EditClass {
  async updateClass(id: string, className: string,
                    year: string, faculty: string) {
    return await prisma.class.update({
      where: {
        id: Number(id),
      },
      data: {
        name: className,
        year: Number(year),
        faculty_id: Number(faculty),
      },
    });
  }
}
