import prisma from "@/lib/prisma";



  export class ClassesAllData {
    async getclassesAllData(
      id: string,

    ) {
      const parsedClassId = parseInt(id)
      return await prisma.class.findUnique({
        where: {
          id: parsedClassId,
        },
      });

    }
  }
