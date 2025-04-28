import { NextResponse } from "next/server";
import { findUserByUsername } from "@/app/api/services/auth/login/find-user-by-username/find-user-by-username";
import { validatePassword } from "@/app/api/services/auth/login/validate-password/validate-password";
import { generateJwtToken } from "@/app/api/services/auth/login/generate-jwt-token/generate-jwt-token";
import { CheckAdminUser } from "@/app/api/services/check-data/check-admin-account/check-existing";
import { createFirstAdmin } from "@/app/api/services/auth/login/create-first-admin/createFirstAdmin";


export async function POST(request: Request) {
  const { userName, password } = await request.json();

  const checkAdmin =  await new CheckAdminUser().checkUserExist();

  if (!checkAdmin) {
 await createFirstAdmin()

  }

  const user = await findUserByUsername(userName);

  if (!user) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 400 }
    );
  }

  const isMatch = await validatePassword(password, user.password_hash);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Mismatching password" },
      { status: 400 }
    );
  }

  const token = await generateJwtToken(user.id);

  return NextResponse.json({
    message: "You have logged in!",
    token,
  });
}
