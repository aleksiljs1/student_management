import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendInvitationEmail } from "@/lib/mail";
import { createInvitation} from "@/app/api/services/auth/invintations/send/create-invintation/create-invintation";
import { findInvitationByEmail } from "@/app/api/services/auth/invintations/send/find-invintation/find-invintation";

export async function POST(request: Request) {
  const { email } = await request.json();

  const existing = await findInvitationByEmail(email);



  if (existing) {
    return NextResponse.json(
      { message: "Invitation already sent to this email" },
      { status: 400 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour



  //const invitationUrl = `${process.env.BASE_URL}/Register?token=${token}`; // refactored , might change my mind later

  await createInvitation(email, token, expiresAt);
  await sendInvitationEmail(email, token);

  return NextResponse.json({ message: "Invitation sent successfully" });
}