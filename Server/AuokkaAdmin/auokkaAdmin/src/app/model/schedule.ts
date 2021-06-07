export class Schedule {
  id: number;
  course: Course = new Course();
  defaultPrice: Price = new Price();
  duration: string;
  location: string;
  defaultPriceId: number;
  courseId: number;
  from: Date;
  to: Date;
  active: number = 0;
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
  active: number = 0;
  createTime: string;
}

export class Price {
  id: number;
  amount: number = 0;

}
