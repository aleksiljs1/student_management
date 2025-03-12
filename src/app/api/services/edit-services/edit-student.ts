import prisma from "@/lib/prisma";

export class EditStudent {
  async getAllStudents(
    id: string,
    Name: string,
    Surname: string,
    gpa: string,
    faculty: string,
    Classes: string,
  ) {
    return await prisma.student.update({
      where: {
        student_id: Number(id),
      },
      data: {
        name: Name,
        surname: Surname,
        gpa: parseFloat(gpa),
        faculty_id: Number(faculty),
        student_class_id: Number(Classes),
      },
    });
  }
}
