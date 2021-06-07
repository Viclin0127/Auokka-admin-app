import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  student: Student = new Student();
  error: string = '';

  constructor(public http: DataService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.put("../api/login/studentLogin", this.student)
      .subscribe(
      res => {
        localStorage.setItem('auokkastudenttoken', res['token']);
        localStorage.setItem('auokkastudentfirstname', res['firstname']);
        localStorage.setItem('auokkastudentsurname', res['surname']);
        this.router.navigate(['/main']);
      },
      error => {
        this.error = error.error;
      }
      );
  }

}
