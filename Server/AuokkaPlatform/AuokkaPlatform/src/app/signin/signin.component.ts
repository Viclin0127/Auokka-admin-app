import { Component, OnInit } from '@angular/core';
import { Utils } from '../utility/utils';
import { Validator } from '../utility/validator';
import { DataService } from '../service/data.service';
import { HttpStatus } from '../utility/httpStatus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  mode: number = 0;

  lang: string = Utils.getLanguage();

  processing: number = 0;

  text: any = {
    en: {
      viaemail: 'Via Email',
      viamobile: 'Via Mobile',
      emailtitle: 'Sign in via email',
      mobiletitle: 'Sign in via mobile',
      emailplaceholder: 'Email',
      passwordplaceholder: 'Password',
      btnsignin: 'Sign in',
      btnsigninprocessing: 'Signing in...',
      forgotpassword: 'Forgot password?',
      mobileplaceholder: 'Mobile',
      signincodeplaceholder: 'Sign in code',
      noaccount: 'Don\'t have an account?',
      signup: 'Sign up',
      signupafter: ' here',
      wrongcredential: 'The email or the password you have entered is incorrect, please try again with correct email or password',
      internalerror: 'Internal server error, please try again later',
      mobilewrongcredential: 'The mobile number you have entered does not exist, please provide the number that was used for registration'
    },
    cn: {
      viaemail: '邮箱登录',
      viamobile: '手机号登录',
      emailtitle: '使用邮箱登录',
      mobiletitle: '使用手机号登录',
      emailplaceholder: '邮箱',
      passwordplaceholder: '密码',
      mobileplaceholder: '手机号',
      signincodeplaceholder: '验证码',
      btnsignin: '登录',
      btnsigninprocessing: '正在登录...',
      forgotpassword: '忘记密码?',
      noaccount: '还没有账号？',
      signup: '点此注册',
      signupafter: '',
      wrongcredential: '邮箱或密码错误，请您输入正确的邮箱或密码再试一次',
      internalerror: '服务器错误，请您稍后再试',
      mobilewrongcredential: '您输入的手机号不存在，请您输入注册时用的手机号'
    }
  }

  form: any = {
    email: '',
    password: '',
    mobile: '',
    signinCode: ''
  }

  errormessage = '';

  validator: Validator

  getcodeProcessing: number = 0;

  mobileerrormessage: string = '';
  constructor(private http: DataService, private router: Router) {
    this.validator = new Validator(this.form);
  }

  ngOnInit() {
  }

  setLanguage(lang: string) {
    Utils.setLanguage(lang);
    this.lang = Utils.getLanguage();
  }

  signin(form: any) {
    if (this.processing == 0) {
      this.errormessage = '';
      this.processing = 1;

      if (this.mode == 0) {
        this.http.put('../api/signin/withemail', form)
          .subscribe(rsp => {
            localStorage.setItem('auokkaplatformtoken', rsp['token']);
            this.router.navigate(['/main/contribution']);
            this.processing = 0;
          }, error => {
            switch (error.status) {
              case HttpStatus.UNAUTHORIZED:
                this.errormessage = this.text[this.lang].wrongcredential;
                break;
              case HttpStatus.INTERNAL_SERVER_ERROR:
                this.errormessage = this.text[this.lang].internalerror;
                break;
              default:
                break;
            }
            this.processing = 0;
          });
      }
      else if (this.mode == 1) {
        this.http.put('../api/signin/withmobile', form)
          .subscribe(rsp => {
            localStorage.setItem('auokkaplatformtoken', rsp['token']);
            this.router.navigate(['/main/contribution']);
            this.processing = 0;
          }, error => {
            switch (error.status) {
              case HttpStatus.UNAUTHORIZED:
                this.errormessage = this.text[this.lang].wrongcredential;
                break;
              case HttpStatus.INTERNAL_SERVER_ERROR:
                this.errormessage = this.text[this.lang].internalerror;
                break;
              default:
                break;
            }
            this.processing = 0;
          });
      }
      else {
        this.processing == 0;
      }

      
    }
  }

  getCode(form: any) {
    if (this.getcodeProcessing == 0) {
      this.getcodeProcessing = 1;
      this.http.put('../api/signin/asksignincode', form)
        .subscribe(rsp => {
          this.mobileerrormessage = '';
          this.getcodeProcessing = 2;
        }, error => {
          switch (error.status) {
            case HttpStatus.UNAUTHORIZED:
              this.mobileerrormessage = this.text[this.lang].mobilewrongcredential;
              break;
            case HttpStatus.INTERNAL_SERVER_ERROR:
              this.mobileerrormessage = this.text[this.lang].internalerror;
              break;
            default:
              break;
          }
          this.getcodeProcessing = 0;
        });
    }
  }


}
