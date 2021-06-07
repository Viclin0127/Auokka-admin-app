import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up-confirm',
  templateUrl: './sign-up-confirm.component.html',
  styleUrls: ['./sign-up-confirm.component.css']
})
export class SignUpConfirmComponent implements OnInit {

  stage: number = 0;// 0 ==processing, 1==success, -1:failed
  validationCode: string = "0";
  message: string = "Congratulations! You have successfully signed up with Auokka. You may click the button below to sign in";
  

  constructor(private http: DataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.validationCode = params['code'];
    });
  }

  ngOnInit() {
    this.submit(this.validationCode);
  }

  submit(validationCode: any) {
    let NOT_FOUND: number = 0;
    let SUCCESS: number = 1;
    let NO_CHANGE: number = 2;
    let UNKNOWN_ERROR: number = 3;
    this.http.get('../api/signup/' + validationCode)
      .subscribe(rsp => {
        let result = +rsp;
        switch (result) {
          case NOT_FOUND:
            this.stage = -1;
            break;
          case SUCCESS:
            this.stage = 1;
            break;
          case NO_CHANGE:
            this.message = "This account has been validated before, you may click the button below to sign in"
            this.stage = 1;
            break;
          default:
            this.stage = -1;
            break;
        }
      }, error => {
        this.stage = -1;
      })
  }
}
