/*
  Warnings:

  - You are about to drop the column `facultyId` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `faculty_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_class_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_facultyId_fkey";

-- DropIndex
DROP INDEX "Student_studentId_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "facultyId",
ADD COLUMN     "faculty_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "classId",
DROP COLUMN "facultyId",
DROP COLUMN "id",
DROP COLUMN "studentId",
ADD COLUMN     "faculty_id" INTEGER NOT NULL,
ADD COLUMN     "student_class_id" INTEGER NOT NULL,
ADD COLUMN     "student_id" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
