import prisma from "@/lib/prisma";

export class CreateStudent {
  async CreatedStudent(
    Name: string,
    Surname: string,
    gpa: string,
    faculty: string,
    Classes: string,
  ) {
    return await prisma.student.create({
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
