import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const existingFaculties = await prisma.faculty.findMany();
    if (existingFaculties.length > 0) {
      return NextResponse.json({ message: "Data already seeded." }, { status: 409 });
    }


    const faculty1 = await prisma.faculty.create({
      data: { name: "Faculty of Software Engineering", head_of_faculty: "Dr.Roland Smith" },
    });
    const faculty2 = await prisma.faculty.create({
      data: { name: "Faculty Of Economics", head_of_faculty: "Dr.Manolis Tafaj" },
    });
    const faculty3 = await prisma.faculty.create({
      data: { name: "Faculty Of Architecture", head_of_faculty: "Dr.Brian Onit " },
    });


    const [classA1, classA2, classA3] = await Promise.all([
      prisma.class.create({ data: { name: "Class A1", year: 2023, faculty_id: faculty1.id } }),
      prisma.class.create({ data: { name: "Class A2", year: 2023, faculty_id: faculty1.id } }),
      prisma.class.create({ data: { name: "Class A3", year: 2023, faculty_id: faculty1.id } }),
    ]);
    const [classB1, classB2, classB3] = await Promise.all([
      prisma.class.create({ data: { name: "Class B1", year: 2023, faculty_id: faculty2.id } }),
      prisma.class.create({ data: { name: "Class B2", year: 2023, faculty_id: faculty2.id } }),
      prisma.class.create({ data: { name: "Class B3", year: 2023, faculty_id: faculty2.id } }),
    ]);
    const [classC1, classC2, classC3] = await Promise.all([
      prisma.class.create({ data: { name: "Class C1", year: 2023, faculty_id: faculty3.id } }),
      prisma.class.create({ data: { name: "Class C2", year: 2023, faculty_id: faculty3.id } }),
      prisma.class.create({ data: { name: "Class C3", year: 2023, faculty_id: faculty3.id } }),
    ]);


    await prisma.student.createMany({
      data: [

        { name: "Eduart", surname: "Lee", gpa: 3.7, faculty_id: faculty1.id, student_class_id: classA1.id },
        { name: "drin", surname: "Park", gpa: 2.4, faculty_id: faculty1.id, student_class_id: classA1.id },
        { name: "Aleksander", surname: "Cela", gpa: 3.2, faculty_id: faculty1.id, student_class_id: classA1.id },
        { name: "Aleksandros", surname: "Iljas", gpa: 2.8, faculty_id: faculty1.id, student_class_id: classA1.id },


        { name: "Kedi", surname: "Kala", gpa: 3.6, faculty_id: faculty1.id, student_class_id: classA2.id },
        { name: "Edi", surname: "Rama", gpa: 1.7, faculty_id: faculty1.id, student_class_id: classA2.id },
        { name: "Sali", surname: "Berisha", gpa: 2.9, faculty_id: faculty1.id, student_class_id: classA2.id },
        { name: "Alban", surname: "Skenderaj", gpa: 3.1, faculty_id: faculty1.id, student_class_id: classA2.id },


        { name: "Mirsab", surname: "Tafaj", gpa: 1.5, faculty_id: faculty1.id, student_class_id: classA3.id },
        { name: "Donald", surname: "Trump", gpa: 3.3, faculty_id: faculty1.id, student_class_id: classA3.id },
        { name: "Komun", surname: "Astiraj", gpa: 2.6, faculty_id: faculty1.id, student_class_id: classA3.id },
        { name: "Enver", surname: "Hoxha", gpa: 3.8, faculty_id: faculty1.id, student_class_id: classA3.id },


        { name: "Arkimed", surname: "Lushaj", gpa: 2.4, faculty_id: faculty2.id, student_class_id: classB1.id },
        { name: "Guts", surname: "Grifith", gpa: 2.2, faculty_id: faculty2.id, student_class_id: classB1.id },
        { name: "Ledion", surname: "Jung", gpa: 3.9, faculty_id: faculty2.id, student_class_id: classB1.id },
        { name: "Lig", surname: "Ma", gpa: 3.0, faculty_id: faculty2.id, student_class_id: classB1.id },


        { name: "Data", surname: "Works", gpa: 1.5, faculty_id: faculty2.id, student_class_id: classB2.id },
        { name: "Elon", surname: "Musk", gpa: 2.6, faculty_id: faculty2.id, student_class_id: classB2.id },
        { name: "Steve", surname: "Jobs", gpa: 3.7, faculty_id: faculty2.id, student_class_id: classB2.id },
        { name: "Ismail", surname: "SKadare", gpa: 3.1, faculty_id: faculty2.id, student_class_id: classB2.id },


        { name: "Sdua", surname: "Lipa", gpa: 2.8, faculty_id: faculty2.id, student_class_id: classB3.id },
        { name: "Jim", surname: "Pellushi", gpa: 2.9, faculty_id: faculty2.id, student_class_id: classB3.id },
        { name: "Era", surname: "Isnottrefi", gpa: 3.0, faculty_id: faculty2.id, student_class_id: classB3.id },
        { name: "Anjeze", surname: "Bojaxhiu", gpa: 3.6, faculty_id: faculty2.id, student_class_id: classB3.id },


        { name: "George", surname: "Castriot", gpa: 3.1, faculty_id: faculty3.id, student_class_id: classC1.id },
        { name: "Walter", surname: "White", gpa: 2.7, faculty_id: faculty3.id, student_class_id: classC1.id },
        { name: "Saul", surname: "Goodman", gpa: 3.4, faculty_id: faculty3.id, student_class_id: classC1.id },
        { name: "Ben", surname: "Askren", gpa: 3.3, faculty_id: faculty3.id, student_class_id: classC1.id },


        { name: "Connor", surname: "McGreggor", gpa: 2.8, faculty_id: faculty3.id, student_class_id: classC2.id },
        { name: "Anthony", surname: "Joshua", gpa: 3.0, faculty_id: faculty3.id, student_class_id: classC2.id },
        { name: "Smoke", surname: "Izbad", gpa: 3.2, faculty_id: faculty3.id, student_class_id: classC2.id },
        { name: "Lemz", surname: "Tshtima", gpa: 2.6, faculty_id: faculty3.id, student_class_id: classC2.id },


        { name: "Richard", surname: "Shotfor", gpa: 3.9, faculty_id: faculty3.id, student_class_id: classC3.id },
        { name: "Hug", surname: "dag", gpa: 2.3, faculty_id: faculty3.id, student_class_id: classC3.id },
        { name: "Myke", surname: "Tyson", gpa: 2.5, faculty_id: faculty3.id, student_class_id: classC3.id },
        { name: "Harry", surname: "Baals", gpa: 3.0, faculty_id: faculty3.id, student_class_id: classC3.id },
      ],
    });

    return NextResponse.json({ message: "Data seeded successfully." }, { status: 201 });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ message: "Failed to seed data." }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
