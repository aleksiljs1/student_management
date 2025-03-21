import prisma from "@/lib/prisma";

export const getGpaInFaculty =  async (Id: string) => {
const facultyId = Number(Id)

    const lowGPA= await prisma.student.count({ where: { gpa: { lt: 2.0 }, faculty_id: facultyId } })
    const midGPA= await prisma.student.count({ where: { gpa: { gte: 2.0, lte: 3.0 }, faculty_id: facultyId } })
    const highGPA= await prisma.student.count({ where: { gpa: { gt: 3.0 }, faculty_id: facultyId } })

return [
  {category: "Below 2.0" , count:lowGPA},
  {category: "Between 2-3" , count:midGPA},
  {category: "above 3.0" , count:highGPA},


]
}