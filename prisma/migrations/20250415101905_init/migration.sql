-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_student_class_id_fkey";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_student_class_id_fkey" FOREIGN KEY ("student_class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
