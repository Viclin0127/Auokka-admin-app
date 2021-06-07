import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Validator } from '../utility/validator';
import { Utils } from '../utility/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  text: any = {
    en: {
      title: 'Create a new Auokka account',
      instruction: 'Please the form with your information',
      firstnameplaceholder: 'First name',
      firstnameempty: 'First name cannot be empty',
      surnameplaceholder: 'Surname',
      surnameempty: 'Surname cannot be empty',
      emailplaceholder: 'Email e.g johnsmith@gmail.com',
      emailinvalid: 'The email address is invalid, please provide a valid email address',
      emailexist: 'This email has been used',
      mobileplaceholder: 'Mobile e.g +61412345678',
      mobileinvalid: 'The mobile number is invalid, please provide a valid mobile number',
      passwordplaceholder: 'Password',
      passwordlengtherror: 'The password must contain at least 8 character',
      passwordnotmatch: 'Two passwords must match each other',
      confirmpaswplaceholder: 'Confirm Password',
      wechat: 'Wechat (optional)',
      btnsignup: 'Sign up',
      btnsignupprocessing: 'Signing up...',
      signinhint: 'Signed up already?',
      signinlink: 'Sign in',
      signinlinkafter: ' here',
      successtitle: 'You\'re almost there...',
      success: 'Thank you for signing up with Auokka, We have send a confirmation email to:',
      next: 'please click the link within the email to complete the registration'
    },
    cn: {
      title: '创建新Auokka账号',
      instruction: '请在下方填入您的信息',
      firstnameplaceholder: '名',
      firstnameempty: '名称不能为空',
      surnameplaceholder: '姓',
      surnameempty: '姓氏不能为空',
      emailplaceholder: '邮箱 例：johnsmith@gmail.com',
      emailinvalid: '邮箱格式不正确，请输入正确邮箱',
      emailexist: '这个邮箱已经被使用',
      mobileplaceholder: '手机 例：+8618612312345',
      mobileinvalid: '手机号码格式不正确，请输入正确的手机号码',
      passwordplaceholder: '密码',
      passwordlengtherror: '密码至少需要由八个字符组成',
      passwordnotmatch: '密码需要保持一致',
      confirmpaswplaceholder: '确认密码',
      wechat: '微信（选填）',
      btnsignup: '注册',
      btnsignupprocessing: '正在处理...',
      signinhint: '已经注册？',
      signinlink: '点此登录',
      signinlinkafter: '',
      successtitle: '还差一步...',
      success: '感谢您的注册，我们发了一封确认邮件至：',
      next: '请您点击邮件内的链接以完成注册'
    }
  }

  validator: Validator = new Validator({
    firstname: '',
    surname: '',
    email: '',
    mobile: '',
    password: '',
    wechat: ''
  });

  confirmPassword: string = '';

  lang: string = 'en';

  stage: number = 0;

  processing: number = 0;

  emailExist = false;
  constructor(private http: DataService) {
    this.lang = Utils.getLanguage();
  }

  ngOnInit() {
  }

  setLanguage(lang: string) {
    Utils.setLanguage(lang);
    this.lang = Utils.getLanguage();
  }

  submit(form: any) {
    if (this.processing == 0) {
      this.processing = 1;
      this.validator.allModified();
      if (this.validateForm()) {
        this.http.post('../api/signup', form)
          .subscribe(rsp => {
            this.stage = 1;
            this.processing = 0;
          }, error => {
            this.processing = 0;
          })
      }
      else {
        this.processing = 0;
      }
    }
    
    
  }

  validateEmpty(string: string) {
    return !(string == null || string == '');
  }

  validateEmail(email: string) {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
  }

  validateMobile(mobile: string) {
    //console.log(mobile)
    let regexp = new RegExp(/^(?:\+)?[0-9]+$/);
    //console.log(regexp.test(mobile))
    return regexp.test(mobile);
  }

  validatePassword(password: string) {
    let el = document.getElementById('passwordError');
    if (password.length < 8) {
      
      el.innerHTML = this.text[this.lang].passwordlengtherror;
      return false;
    }
    else {
      el.innerHTML = this.text[this.lang].passwordnotmatch;
      return password == this.confirmPassword;
    }
    return true;
  }

  validateForm() {
    this.validator.allModified();
    return this.validateEmail(this.validator.getValue('email')) &&
      this.validateMobile(this.validator.getValue('mobile')) &&
      this.validatePassword(this.validator.getValue('password')) &&
      this.validateEmpty(this.validator.getValue('firstname')) &&
      this.validateEmpty(this.validator.getValue('surname')) &&
      !this.emailExist;
  }


  emailUsed(email: string) {
    this.http.get('../api/signup/emailexist/' + email)
      .subscribe(rsp => {
        this.emailExist = <boolean>rsp
      }, error => {
        this.emailExist = false;
      })
  }
}
