import { NextResponse } from "next/server";
import { getInvitationByToken } from "@/app/api/services/auth/invintations/validate/get-invintation/invintation";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  console.log("back end token is ", token);

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const invitation = await getInvitationByToken(token);

  if (!invitation) {
    return NextResponse.json(
      { valid: false, message: "Invalid token" },
      { status: 400 }
    );
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json(
      { valid: false, message: "Invitation expired" },
      { status: 400 }
    );
  }

  if (invitation.usedAt) {
    return NextResponse.json(
      { valid: false, message: "Invitation already used" },
      { status: 400 }
    );
  }

  return NextResponse.json({ valid: true });
}