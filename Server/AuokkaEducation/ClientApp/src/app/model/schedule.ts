export class Schedule {
  id: number;
  course: Course = new Course();
  defaultPrice: Price = new Price();
  duration: string;
  location: string;
  defaultPriceId: number;
  courseId: number;
  from: string;
  to: string;
}

export class Course {
  id: number;
  name: string;
  image: string;
  description: string;
  detail: string;
  parsedDetail: any[];
  level: string;
  schedule: Schedule[] = [];
}

export class Price {
  id: number;
  amount: number = 0;

}
