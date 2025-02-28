import { PrismaClient, Prisma } from "@prisma/client";
import { CLASS } from "postcss-selector-parser";

const prisma = new PrismaClient();

async function main() {
  const facultyEngineering = await prisma.faculty.create({
    data: {
      name: "Faculty of economy",
      head_of_faculty: "Silvia Basha",
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
//mos e prek perdore per seed
