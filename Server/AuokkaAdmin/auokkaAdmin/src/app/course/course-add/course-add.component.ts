import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/schedule';
import { DataService } from '../../service/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ElMessageService } from 'element-angular';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  course: Course = new Course();
  f = (http: DataService, model: Course): Observable<any> => {
    return http.post('../api/courses', model);
  };

  constructor(public http: DataService, public router: Router) { }

  ngOnInit() {
  }

  addCourse(event: Observable<any>) {
    event.subscribe(
      res => {
        this.router.navigate(['/course']);
      }, error => {

      }
    )
  }

}
