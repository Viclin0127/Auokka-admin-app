import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form.component';
import { DataService } from '../../../service/data.service';
import { Field } from '../field';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: '../form.component.html',
  styleUrls: ['../form.component.css']
})
export class SignUpFormComponent extends FormComponent implements OnInit {



  constructor(public http: DataService) {
    super(http);
    this.model = new Student()
  }

  ngOnInit() {
   
    this.fields.push(new Field('Username', 'username', 'text', '', true));
    this.fields.push(new Field('Password', 'password', 'password', '', true));
    this.fields.push(new Field('First Name', 'firstname', 'text', '', true));
    this.fields.push(new Field('Surname', 'surname', 'text', '', true));
    this.fields.push(new Field('Email', 'email', 'text', '', true));
    this.fields.push(new Field('Phone', 'mobile', 'text', ''));
    this.fields.push(new Field('Date Of Birth (MM/DD/YYYY)', 'birthDate', 'date', '', true));
    this.fields.push(new Field('School', 'school', 'text', ''));
  }

  submit() {
    this.emitter.emit(this.http.post('../api/students', this.model));
  }

}
