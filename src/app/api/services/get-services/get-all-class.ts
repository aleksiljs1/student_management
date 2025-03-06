import prisma from "@/lib/prisma";

export class ClassService {
  async getAllClass() {
    return await prisma.class.findMany({});
  }
}