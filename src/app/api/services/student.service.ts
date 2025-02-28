import prisma from "@/lib/prisma";
import { Student } from "@/app/api/student-data/models/Student";

export class StudentService {
  async getAllStudents() {
    return await prisma.student.findMany({});
  }
}
export class FacultyService {
  async getAllFaculty() {
    return await prisma.faculty.findMany({});
  }
}
export class ClassService {
  async getAllClass() {
    return await prisma.class.findMany({});
  }
}
