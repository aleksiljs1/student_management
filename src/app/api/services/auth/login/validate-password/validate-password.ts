import bcrypt from "bcrypt";

export async function validatePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}


