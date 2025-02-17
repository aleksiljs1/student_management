import { Student } from "./Student";

export class admir implements Student {
  student_id = "SPF9901";
  studentName: string = "Admir";
  surname: string = "Brucaj";
  gpa: number = 2.75;

  getId(): string {
    return this.student_id;
  }
  getSurname(): string {
    return this.surname;
  }
  getName(): string {
    return this.studentName;
  }
  getGpa(): number {
    return this.gpa;
  }
}
