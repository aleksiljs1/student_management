import { verifyAuth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function getUserPayloadFromRequest(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("No token provided");

  const payload = await verifyAuth(token);
  return payload;
}
