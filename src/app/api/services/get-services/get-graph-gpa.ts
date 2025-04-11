import prisma from "@/lib/prisma";


export const getGpaDistribution = async () => {
  const total = await prisma.student.count();

  const above3 = await prisma.student.count({
    where: {
      gpa: {
        gt: 3,
      },
    },
  });

  const between2and3 = await prisma.student.count({
    where: {
      gpa: {
        gte: 2,
        lte: 3,
      },
    },
  });

  const below2 = await prisma.student.count({
    where: {
      gpa: {
        lt: 2,
      },
    },
  });

  return {
    total,
    above3,
    between2and3,
    below2,
    percentages: {
      above3: Math.round((above3 / total) * 100),
      between2and3: Math.round((between2and3 / total) * 100),
      below2: Math.round((below2 / total) * 100),
    },
  };
};
