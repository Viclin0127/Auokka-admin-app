import { Component, OnInit } from '@angular/core';
import { FetchSize } from '../../utility/fetch-size';
import { DataService } from '../../service/data.service';
import { Course } from '../../model/schedule';
import { Column } from '../../share/table/column';
import { Utils } from '../../utility/utils';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  offset: number = 0;
  pageSize: number = FetchSize.NORMAL;
  total: number = 0;
  courses: Course[] = [];

  columns: Column[] = [];

  sort = Utils.sort;
  imageServer = environment.resourceServer;
  constructor(public http: DataService) {
    this.columns.push(new Column('Img', [], ''));
    this.columns.push(new Column('Title', ['name'], '', true));
    this.columns.push(new Column('Level', ['level'], '', true));
    this.columns.push(new Column('Active', ['active'], '', true));
    this.columns.push(new Column('Create', ['createTime'], '', true));
  }

  ngOnInit() {
    this.loadCourse();
  }

  loadCourse() {
    this.http.get('../api/courses/' + this.offset + '/' + this.pageSize)
      .subscribe(
        res => {
          this.courses = <Course[]>(res['courses']);
          this.total = res['total'];
          this.offset += this.pageSize;
        }
      );
  }

  isNew(date: string) {
    return Date.now().toString() < new Date(date).setDate(new Date(date).getDate() + 1).toString();
  }

  toggleActive(index: number) {
    this.courses[index].active = (this.courses[index].active == 0 ? 1 : 0);
    this.http.put('../api/courses/active/' + this.courses[index].id, this.courses[index])
      .subscribe();
  }

}
