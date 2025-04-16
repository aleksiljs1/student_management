import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export class RegisterUser {
    async createUser( userName : string , password_hash: string , verifyToken: string, verifyExpiry : Date) {

         const user = await prisma.users.create({
            data: {
               username: userName,
               password_hash: password_hash,
               verifyToken,
               verifyExpiry,
            },
         });

         await sendVerificationEmail(userName, verifyToken);

         return user;
      }
}
