-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyExpiry" TIMESTAMP(6),
ADD COLUMN     "verifyToken" VARCHAR(255);
