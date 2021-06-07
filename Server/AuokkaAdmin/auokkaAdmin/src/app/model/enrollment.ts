import { Schedule } from "./schedule";

export class Enrollment {
  id: number;
  studentId: number;
  scheduleId: number;
  enrolFirstname: string;
  enrolSurname: string;
  enrolBirthDate: Date;
  enrolEmail: string;
  enrolPhone: string;
  enrolSchool: string;
  fee: number;
  paid: number;

  schedule: Schedule = new Schedule();
}
