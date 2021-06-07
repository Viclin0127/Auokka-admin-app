import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../form.component';
import { DataService } from '../../../../service/data.service';
import { Processable } from '../../../../interface/processable';
import { ValidatorService } from '../../../../service/validator.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent extends FormComponent implements OnInit, Processable {
  @Input() processStatus: number;
  @Output() emitter = new EventEmitter();
  @Output() cancel = new EventEmitter();
  validation: Map<string, Function>;
  usernameRepeat: boolean = false;
  constructor(public http: DataService, public validator: ValidatorService) {
    super(http);
    this.validation = new Map<string, Function>();
    this.validation['firstname'] = (
      () => {
        var counter = 0;
        counter += (this.validator.verify(this.model.firstname, 'firstname', 'required') ? 1 : 0);
        return (counter == 1 ? true : false);
      }
    );

    this.validation['surname'] = (
      () => {
        var counter = 0;
        counter += (this.validator.verify(this.model.surname, 'surname', 'required') ? 1 : 0);
        return (counter == 1 ? true : false);
      }
    );

    this.validation['email'] = (
      () => {
        var counter = 0;
        counter += (this.validator.verify(this.model.email, 'email', 'required') ? 1 : 0);
        counter += (this.validator.verify(this.model.email, 'email', 'email') ? 1 : 0);
        return (counter == 2 ? true : false);
      }
    );

    this.validation['username'] = (
      () => {
        var counter = 0;
        counter += (this.validator.verify(this.model.username, 'username', 'required') ? 1 : 0);
        counter += (this.usernameRepeat ? 0 : 1);
        return (counter == 2 ? true : false);
      }
    );

    this.validation['password'] = (
      () => {
        var counter = 0;
        counter += (this.validator.verify(this.model.password, 'password', 'required') ? 1 : 0);
        return (counter == 1 ? true : false);
      }
    );
  }

  ngOnInit() {
  }

  valid(value: any, label: string, type: string) {
    return this.validator.message[type](!this.validator.verify(value, label, type), label);

  }

  submit() {
    var validateTarget = ['firstname', 'surname', 'email'];
    if (this.model.id == null) {
      validateTarget.concat(['username', 'password']);
    }
    if (this.validator.allValid(validateTarget) && !this.usernameRepeat) {
      this.emitter.emit(this.model);
    }
    
  }

  checkUsernameRepeat(username) {
    this.usernameRepeat = false;
    if (username != null && username != '') {
      this.http.get('../api/teachers/existUsername/' + username)
        .toPromise()
        .then(
          res => {
            this.usernameRepeat = <boolean>res;
          })
    }
    
  }
}
