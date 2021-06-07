import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Teacher } from '../../model/teacher';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  public teachers: Teacher[] = []
  imageServer = environment.resourceServer;
  constructor(public http: DataService) { }

  ngOnInit() {
    this.loadTeacher();
  }

  loadTeacher() {
    this.http.get('../api/teachers')
      .subscribe(
      res => {
        this.teachers = <Teacher[]>res;
      }, error =>{

      }
      )
  }
}
