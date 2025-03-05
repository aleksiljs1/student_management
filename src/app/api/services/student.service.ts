import prisma from "@/lib/prisma";


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
  async getClassesForFaculty(facultyId : string) {
    const parsedFacultyId = parseInt(facultyId)
    return await prisma.class.findMany({
      where: {
        faculty_id: parsedFacultyId,
      }
    })
  }
}

export class AllUniversityService {
  async getAllUniversity() {

    return await prisma.faculty.findMany({
        include: {
          classes: {
            include: {
              students: true,
              //reference the student array inside of faculty instead of the table students, remember when nesting
            },
          },
        },
      })
    };
  }

  export class StudentsAllData {
  async getStudentsAllData(studentId: string) {
    const parsedStudentId = parseInt(studentId);
    return await prisma.student.findUnique({
        where: {
          student_id: parsedStudentId,
        },
      include: {
        faculty: true,
        student_class: true,
      }// if I want to separate faculty and classes I can get rid of this later, prolly will for classes since i whant
      // them differently
    })
  }
  }
  export class EditStudent{
  async getAllStudents(id:string,Name: string, Surname: string, gpa: string, faculty: string, Classes:string ) {
    return  await prisma.student.update({
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
      })
    }
  }

  export class DeleteStudent{
  a
  }
