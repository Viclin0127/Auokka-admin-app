import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  handleResponse(request: Observable<any>) {
    request.subscribe(
      res => {
        this.router.navigate(['main/signup/success']);
      },
      error => {

      }
    );
  }

}
