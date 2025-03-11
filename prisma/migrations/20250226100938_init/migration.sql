/*
  Warnings:

  - Added the required column `year` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `head_of_faculty` to the `faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "head_of_faculty" TEXT NOT NULL;
