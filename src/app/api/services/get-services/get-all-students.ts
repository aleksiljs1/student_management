import prisma from "@/lib/prisma";


export class StudentService {
  async getAllStudents() {
    return await prisma.student.findMany({});
  }
}