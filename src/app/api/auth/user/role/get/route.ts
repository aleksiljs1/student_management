import { NextRequest, NextResponse } from "next/server";
import { getUserPayloadFromRequest } from "@/lib/utils/token";
import { getUserRoleById } from "@/app/api/services/auth/user/role/get/get";

export async function GET(req: NextRequest) {
  try {
    const payload = await getUserPayloadFromRequest(req);
    const role = await getUserRoleById(payload.id);

    return NextResponse.json({ role });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
