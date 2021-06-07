import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Teacher } from '../../model/teacher';
import { FetchSize } from '../../utility/fetch-size';
import { LoadStatus } from '../../utility/load-status';
import { Column } from '../../share/table/column';
import { Utils } from '../../utility/utils';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[] = [];
  offset: number = 0;
  pageSize: number = FetchSize.NORMAL;
  total: number = 0;

  editingIndex: number = -1;
  editingTeacher: Teacher = new Teacher();
  teacherProcessingStatus: number = LoadStatus.IDLE;

  showModal: boolean = false;
  columns: Column[] = [];

  sort = Utils.sort;

  constructor(public http: DataService) {
    this.columns.push(new Column('Img', [], ''));
    this.columns.push(new Column('First Name', ['firstname'], '', true));
    this.columns.push(new Column('Surname', ['surname'], '', true));
    this.columns.push(new Column('Title', ['title'], '', true));
    this.columns.push(new Column('Active', ['active'], ''));
    this.columns.push(new Column('Create', ['createTime'], '', true));
  }

  loadTeacher() {
    this.http.get('../api/teachers/' + this.offset + '/' + this.pageSize)
      .subscribe(
        res => {
          this.teachers = <Teacher[]>(res['teachers']);
          this.total = res['total'];
          this.offset += this.pageSize;
        }
      );
  }

  isNew(date: string) {
    return Date.now().toString() < new Date(date).setDate(new Date(date).getDate() + 1).toString();
  }

  ngOnInit() {
    this.loadTeacher();
  }

  toggleActive(index: number) {
    this.teachers[index].active = (this.teachers[index].active == 0 ? 1 : 0);
    this.http.put('../api/teachers/active/' + this.teachers[index].id, this.teachers[index])
      .subscribe();
  }

  editTeacher(index: number = -1) {
    if (index == -1) {
      this.editingTeacher = new Teacher();
      
    }
    else {
      this.editingIndex = index;
      this.editingTeacher = Object.assign({}, this.teachers[index]);
      //this.editingTeacher = <Teacher>(JSON.parse(JSON.stringify(this.teachers[index])));

    }
    this.showModal = true;
  }

  teacherSubmit(teacher: Teacher) {
    this.teacherProcessingStatus = LoadStatus.PROCESSING;
    if (teacher.id == null) {
      this.http.post('../api/teachers', this.editingTeacher)
        .subscribe(
          res => {
            this.teacherProcessingStatus = LoadStatus.PROCESSING_SUCCESS;
            this.teachers.push(<Teacher>res);
            this.showModal == false;
          }, error => {
            this.teacherProcessingStatus = LoadStatus.PROCESSING_ERROR;
          }
        );
    }
    else {
      this.http.put('../api/teachers/' + this.editingTeacher.id, this.editingTeacher)
        .subscribe(
          res => {
            this.teacherProcessingStatus = LoadStatus.PROCESSING_SUCCESS;
            this.teachers[this.editingIndex] = <Teacher>res;
          }, error => {
            this.teacherProcessingStatus = LoadStatus.PROCESSING_ERROR;
          }
        );
    }
  }
}
