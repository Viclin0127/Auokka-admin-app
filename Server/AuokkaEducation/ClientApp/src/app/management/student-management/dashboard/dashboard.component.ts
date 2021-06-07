import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //enrollments: Schedule[] = [];

  constructor(public http: DataService) {

  }

  ngOnInit() {
  }

}
