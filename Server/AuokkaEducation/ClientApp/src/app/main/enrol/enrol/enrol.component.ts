import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Course, Schedule } from '../../../model/schedule';
import { Observable } from 'rxjs';
import { Enrollment } from '../../../model/enrollment';
import { Utils } from '../../../utility/utils';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-enrol',
  templateUrl: './enrol.component.html',
  styleUrls: ['./enrol.component.css']
})
export class EnrolComponent implements OnInit {
  course: Course = new Course();
  selectedSchedule: Schedule = new Schedule();
  enrollment: Enrollment = new Enrollment();
  loading = true;
  constructor(public route: ActivatedRoute, public http: DataService, public router: Router) {
    Utils.checkStudentLogin(http).subscribe(
      res => {
        this.loading = false;
        let student = <Student>res;
        this.enrollment.enrolFirstname = student.firstname;
        this.enrollment.enrolSurname = student.surname;
        this.enrollment.enrolEmail = student.email;
        this.enrollment.enrolPhone = student.mobile;
        this.enrollment.enrolSchool = student.school;
        this.enrollment.enrolBirthDate = student.birthDate;
      },
      error => {
        this.router.navigate(['/main/needlogin']);
      }
    )
  }

  ngOnInit() {
    var courseId = +(this.route.snapshot.paramMap.get("course"));
    this.http.get('../api/courses/detail/' + courseId)
      .subscribe(
        res => {
          this.course = <Course>res;
          
        }, error => {

        }
      );
  }

  setSelectedSchedule(schedule:Schedule) {
    this.selectedSchedule = schedule;
    this.enrollment.scheduleId = this.selectedSchedule.id;
  }


  submit(request: Observable<any>) {
    request.subscribe(
      res => {
        this.router.navigate(['main/enrol/success/' + res['id']]);
      }, error => {

      }
    );
  }


}
