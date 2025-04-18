import { NextResponse } from "next/server";
import { findInvitationByEmail } from "@/app/api/services/auth/register/find-invintation-by-email/find-invintation-by-email";
import { isInvitationExpired } from "@/app/api/services/auth/register/invintation-expiry/invintation-expiry";
import { findUserByUsername } from "@/app/api/services/auth/register/find-user-by-username/find-user-by-username";
import { createUser } from "@/app/api/services/auth/register/create-user/create-user";
import { markInvitationUsed } from "@/app/api/services/auth/register/mark-invintation-used/mark-invintation-used";


export async function POST(request: Request) {
  const { userName, password } = await request.json();

  const invitation = await findInvitationByEmail(userName);

  if (!invitation) {
    return NextResponse.json(
      {
        message:
          "Invitation Not Found. Please register using the same email the invitation was sent to.",
      },
      { status: 400 }
    );
  }

  if (invitation.usedAt) {
    return NextResponse.json(
      { message: "Invitation has already been used." },
      { status: 400 }
    );
  }

  if (isInvitationExpired(invitation)) {
    return NextResponse.json(
      { message: "Expired invitation." },
      { status: 400 }
    );
  }

  const userExists = await findUserByUsername(userName);

  if (userExists) {
    return NextResponse.json(
      { message: "User already exists." },
      { status: 400 }
    );
  }

  await createUser(userName, password);
  await markInvitationUsed(invitation.id);

  return NextResponse.json({
    message: "Registration successful! You can now login.",
  });
}
