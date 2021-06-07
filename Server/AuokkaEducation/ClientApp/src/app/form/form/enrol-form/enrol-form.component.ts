import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { FormComponent } from '../form.component';
import { Field } from '../field';
import { Enrollment } from '../../../model/enrollment';

@Component({
  selector: 'app-enrol-form',
  templateUrl: '../form.component.html',
  styleUrls: ['../form.component.css']
})
export class EnrolFormComponent extends FormComponent implements OnInit {

  constructor(public http: DataService) {
    super(http);
  }

  ngOnInit() {
    this.fields.push(new Field('First Name', 'enrolFirstname', 'text', (<Enrollment>(this.model)).enrolFirstname, true));
    this.fields.push(new Field('Surname', 'enrolSurname', 'text', (<Enrollment>(this.model)).enrolSurname, true));
    this.fields.push(new Field('Email', 'enrolEmail', 'text', (<Enrollment>(this.model)).enrolEmail, true));
    this.fields.push(new Field('Phone', 'enrolPhone', 'text', (<Enrollment>(this.model)).enrolPhone));
    this.fields.push(new Field('Date Of Birth (MM/DD/YYYY)', 'enrolBirthDate', 'date', (<Enrollment>(this.model)).enrolBirthDate, true));
    this.fields.push(new Field('School', 'enrolSchool', 'text', (<Enrollment>(this.model)).enrolSchool));
  }

  submit() {
    this.emitter.emit(this.http.post('../api/Enrollments', this.model));
  }

}
