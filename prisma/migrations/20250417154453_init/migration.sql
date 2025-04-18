/*
  Warnings:

  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verifyExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isVerified",
DROP COLUMN "verifyExpiry",
DROP COLUMN "verifyToken";
