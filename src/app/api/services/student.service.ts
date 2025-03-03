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

