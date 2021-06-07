import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Schedule } from '../../model/schedule';
import { DisplayCourse } from '../../display-model/display-course';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() api: string = '';
  @Input() title: string = 'All Courses';
  courses: DisplayCourse[] = [];
  offset: number = 0;
  pageSize: number = 20;
  totalSize: number = 0;
  
  constructor(public http: DataService) { }

  ngOnInit() {
    this.loadCourse(this.offset, this.pageSize, this.http)
  }

  loadCourse(offset: number, pageSize: number, http: DataService) {
    http.get('../api/schedules/list/' + offset + '/' + pageSize)
      .subscribe(
        res => {
          this.totalSize = res['total'];
          this.courses = this.courses.concat(<DisplayCourse[]>(res['courseInfo']));
          this.offset += this.pageSize;
        }, error => {

        }
      );
  }

}
