import prisma from "@/lib/prisma";

export const getClassAveragesInFaculty = async (id: string) => {
  const facultyId = Number(id);


  const classes = await prisma.class.findMany({
    where: { faculty_id: facultyId },
    include: {
      students: {
        select: { gpa: true }
      }
    }
  });


};
//most of the code here e kam ber delete sepse ishte redundant i will remake it