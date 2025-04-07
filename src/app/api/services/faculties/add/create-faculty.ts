import prisma from "@/lib/prisma";
export class CreateFaculty {
  async createdFaculty(facultyName: string, facultyHead: string) {
    return await prisma.faculty.create({
      data: {
        name: facultyName,
        head_of_faculty: facultyHead,
      },
    });
  }
}
