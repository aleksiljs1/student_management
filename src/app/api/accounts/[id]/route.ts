import { NextResponse } from "next/server";
import { updateUserRole } from "@/app/api/services/accounts/get-on-change/get-change";


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { newRole } = await request.json();
    const userId = parseInt(params.id);

    const updatedUser = await updateUserRole(userId, newRole);

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Role update failed" },
      { status: 500 }
    );
  }
}