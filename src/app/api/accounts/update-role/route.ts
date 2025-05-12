import { NextResponse } from "next/server";

import { Role } from "@prisma/client";
import { updateUserRoleById } from "@/app/api/services/accounts/update-role/update-role";

export async function PUT(request: Request) {
  try {
    const { userId, newRole } = await request.json();


    const updatedUser = await updateUserRoleById(userId, newRole as Role);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Role update failed" },
      { status: 500 }
    );
  }
}