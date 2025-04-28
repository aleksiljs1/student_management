import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendInvitationEmail } from "@/lib/mail";
import { createInvitation} from "@/app/api/services/auth/invintations/send/create-invintation/create-invintation";
import { findInvitationByEmail } from "@/app/api/services/auth/invintations/send/find-invintation/find-invintation";
import { verifyAuth } from "@/lib/auth";


export async function POST(request: Request) {
  try {

    const token = request.headers.get('Authorization')?.split(' ')[1];
    console.log("Using token:", token);
    if (!token) {throw new Error("Unauthorized");}

    const payload = await verifyAuth(token);
    if (!payload.id){ throw new Error("Invalid token");}

    const { email } = await request.json();

    const existing = await findInvitationByEmail(email);


    if (existing) {


      await prisma.invitation.delete({
        where: { email: email }
      });
    }



    const tokenn = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour


    //const invitationUrl = `${process.env.BASE_URL}/Register?token=${token}`; // refactored , might change my mind later

    await createInvitation(email, tokenn, expiresAt, payload.id);
    await sendInvitationEmail(email, tokenn);

    return NextResponse.json({ message: "Invitation sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { message:"Error sending invitation", error },
      { status: 401 }
    );
  }
}