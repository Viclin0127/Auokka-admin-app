import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { Enrollment } from '../../../model/enrollment';

@Component({
  selector: 'app-enrol-success',
  templateUrl: './enrol-success.component.html',
  styleUrls: ['./enrol-success.component.css']
})
export class EnrolSuccessComponent implements OnInit {

  enrollment: Enrollment = new Enrollment();
  constructor(public route: ActivatedRoute, public http: DataService) {
  }

  ngOnInit() {
    var enrollmentId = +(this.route.snapshot.paramMap.get("enrollment"));
    this.http.get('../api/enrollments/' + enrollmentId)
      .subscribe(
      res => {
        this.enrollment = <Enrollment>res;
      }, error => {

      }
      )
  }

}
