import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export class InvitationLogsTable {
  async getInvitationLogsTable(page: number, pageSize: number, search?: string) {
    const skip = (page - 1) * pageSize;

    const searching: Prisma.InvitationLogWhereInput = search
      ? {
        OR: [
          { email: { contains: search, mode: "insensitive" } },
          { createdBy: { username: { contains: search, mode: "insensitive" } } }
        ]
      }
      : {};

    const [invitationLogs, totalLogs] = await Promise.all([
      prisma.invitationLog.findMany({
        skip,
        take: pageSize,
        where: searching,
        select: {
          id: true,
          email: true,
          token: true,
          createdAt: true,
          expiresAt: true,
          usedAt: true,
          createdBy: {
            select: {
              id: true,
              username: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.invitationLog.count({
        where: searching
      })
    ]);

    const totalPages = Math.ceil(totalLogs / pageSize);

    return {
      data: invitationLogs,
      totalPages,
      currentPage: page
    };
  }
}