import { jwtVerify } from "jose";

interface UserJwtPayload {
  iat: number;
  exp: number;
  id: number;
} // meso se ku rruhen dhe memorizohen

const getJwtSecretKey = () => {
  const secret = process.env.SECRET_KEY;
  if (!secret) throw new Error("SECRET_KEY is not set");
  return new TextEncoder().encode(secret);
};

export const verifyAuth = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    console.log("Token verified:", payload);
    return payload as unknown as UserJwtPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid or expired token");
  }
};
