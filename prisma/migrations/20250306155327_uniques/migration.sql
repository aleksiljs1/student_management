/*
  Warnings:

  - A unique constraint covering the columns `[name,year,faculty_id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,surname]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_faculty_id_student_class_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_year_faculty_id_key" ON "Class"("name", "year", "faculty_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_name_surname_key" ON "Student"("name", "surname");
