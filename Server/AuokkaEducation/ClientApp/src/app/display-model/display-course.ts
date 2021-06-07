import { Price } from "../model/schedule";

export class DisplayCourse {
  id: number;
  name: string;
  image: string;
  description: string;
  level: string;
  duration: string;
  commence: Date;
  prices: Price[] = [];
  location: string;
}
