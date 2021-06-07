import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../../model/schedule';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-course-board',
  templateUrl: './course-board.component.html',
  styleUrls: ['./course-board.component.css']
})
export class CourseBoardComponent implements OnInit {
  @Input() enrollments: Schedule[] = [];
  @Input() api: string;
  constructor(public http: DataService) { }

  ngOnInit() {
    this.http.get(this.api)
      .subscribe(
        res => {
          this.enrollments = <Schedule[]>res;

        }, error => {

        }
      )
  }

}
