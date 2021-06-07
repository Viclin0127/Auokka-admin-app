import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Course, Schedule } from '../../model/schedule';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  course: Course = new Course();
  schedule: Schedule = new Schedule
  tabs: any[] = [];
  selectedTab: number = 0;
  imageServer = environment.resourceServer;
  constructor(public route:ActivatedRoute, public http: DataService) { }

  ngOnInit() {
    var courseId = +(this.route.snapshot.paramMap.get("course"));
    var scheduleId = +(this.route.snapshot.paramMap.get("schedule"));
    this.loadCourse(courseId, scheduleId, this.http);
  }

  loadCourse(courseId: number, scheduleId: number, http: DataService) {
    http.get('../api/courses/detail/' + courseId)
      .subscribe(
      res => {
        this.course = <Course>res;
        this.course.parsedDetail = JSON.parse(this.course.detail);
        for (let d of this.course.parsedDetail) {
          if (d.showOnSide) {
            this.tabs.push(d);
          }
        }
        }, error => {

        }
      );
  }

  slideTo(title, index) {
    let el = document.getElementById(title);
    el.scrollIntoView({ behavior: 'smooth' });
    this.selectedTab = index;
  }

}
