import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loadable } from '../../interface/loadable';
import { DataService } from '../../service/data.service';
import { LoadStatus } from '../../utility/load-status';
import { Course } from '../../model/schedule';
import { Observable } from 'rxjs';
import { Processable } from '../../interface/processable';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit, Loadable, Processable {
  processStatus: number = LoadStatus.IDLE;
  status: number = LoadStatus.LOADING;
  
  course: Course;

  infoSectionCollapse = true;

  f = (http: DataService, model: Course): Observable<any> => {
    return http.put('../api/courses/' + model.id, model);
  };

  constructor(public route: ActivatedRoute, public http: DataService) { }

  ngOnInit() {
    var courseId = +(this.route.snapshot.paramMap.get("course"));
    this.loadCourse(courseId);
  }

  loadCourse(id: number) {
    this.status = LoadStatus.LOADING;
    this.http.get('../api/courses/' + id)
      .subscribe(
      res => {
        this.course = <Course>res;
        this.status = LoadStatus.LOADED;
      }, error => {

        this.status = LoadStatus.LOAD_FAILED;
      }
      );
  }

  updateCourse(event: Observable<any>) {
    this.processStatus = LoadStatus.PROCESSING;
    event.subscribe(
      res => {
        this.processStatus = LoadStatus.PROCESSING_SUCCESS;
      }, error => {
        this.processStatus = LoadStatus.PROCESSING_ERROR;
      }
    )
  }
}
