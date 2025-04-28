import { SignJWT } from "jose";
import { SECRET_KEY } from "@/lib/user-store";

export async function generateJwtToken(id: number) {
  return new SignJWT({id})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(SECRET_KEY));
}