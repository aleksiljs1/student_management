// File: app/api/data/invitation-logs/view/route.ts
import { NextResponse } from "next/server";
import { InvitationLogsTable } from "@/app/api/data/invitation-logs/view/getInvintationLogsTable";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const query = searchParams.get("query") || "";

  const invitationLogsTable = new InvitationLogsTable();

  try {
    const result = await invitationLogsTable.getInvitationLogsTable(page, pageSize, query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching invitation logs:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

