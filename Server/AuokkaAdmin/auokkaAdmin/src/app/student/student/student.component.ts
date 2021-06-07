import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import { DataService } from '../../service/data.service';
import { FetchSize } from '../../utility/fetch-size';
import { Column } from '../../share/table/column';
import { Utils } from '../../utility/utils';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  offset: number = 0;
  pageSize: number = FetchSize.NORMAL;
  total: number = 0;

  columns: Column[] = [];

  sort = Utils.sort;
  constructor(public http: DataService) {
    this.loadStudent();
  }

  ngOnInit() {
    this.columns.push(new Column('First Name', ['firstname'], 'text', true));
    this.columns.push(new Column('Surname', ['surname'], 'text', true));
    this.columns.push(new Column('Email', ['email'], 'text', true));
    this.columns.push(new Column('Date Of Birth', ['birthDate'], 'date', true));
    this.columns.push(new Column('Mobile', ['mobile'], 'text', true));
    this.columns.push(new Column('School', ['school'], 'text', true));
  }

  loadStudent() {
    this.http.get('../api/students/' + this.offset + '/' + this.pageSize)
      .subscribe(res => {
        this.students = <Student[]>(res['students']);
        this.total = res['total'];
        this.offset += this.pageSize;
      }, error => {

      })
  }
}
