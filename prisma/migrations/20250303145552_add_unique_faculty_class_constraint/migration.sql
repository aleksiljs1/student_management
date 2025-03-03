/*
  Warnings:

  - A unique constraint covering the columns `[faculty_id,student_class_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_faculty_id_student_class_id_key" ON "Student"("faculty_id", "student_class_id");
