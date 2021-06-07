import { Component, OnInit, OnDestroy } from '@angular/core';
import { Utils } from '../../utility/utils';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../service/language/language.service';
import { DataService } from '../../service/data.service';
import { Validator } from '../../utility/validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  text = {
    en: {
      title: 'Profile',
      firstname: 'First name',
      firstnameplaceholder: 'First name',
      firstnameempty: 'First name cannot be empty',
      surname: 'Surname',
      surnameplaceholder: 'Surname',
      surnameempty: 'Surname cannot be empty',
      email: 'Email',
      emailplaceholder: 'E.g join.smith@hotmail.com',
      emailinvalid: 'The email address is invalid, please provide a valid email address',
      mobile: 'Mobile',
      mobileplaceholder: 'E.g +614123456789',
      mobileinvalid: 'The mobile number is invalid, please provide a valid mobile number',
      wechat: 'WeChat',
      wechatplaceholder: 'WeChat (optional)',
      save: 'Save'

    },
    cn: {
      title: '用户资料',
      firstname: '名称',
      firstnameplaceholder: '名称',
      firstnameempty: '名称不能为空',
      surname: '姓氏',
      surnameplaceholder: '姓氏',
      surnameempty: '姓氏不能为空',
      email: '邮箱',
      emailplaceholder: '例：join.smith@hotmail.com',
      emailinvalid: '邮箱格式不正确，请输入正确邮箱',
      mobile: '手机号',
      mobileplaceholder: '例：+8613812345678',
      mobileinvalid: '手机号码格式不正确，请输入正确的手机号码',
      wechat: '微信号',
      wechatplaceholder: '微信号（选填）',
      save: '保存'
    }
  }

  lang: string = Utils.getLanguage();
  langSubscription: Subscription;
  validator: Validator;
  user: any = {
    id: '',
    firstname: '',
    surname: '',
    email: '',
    mobile: '',
    wechat:''
  }

  saveProcessing: boolean = false;

  constructor(private http: DataService, private langService: LanguageService) {
    this.validator = new Validator(this.user);
    this.langSubscription = this.langService.getLanguageSetting()
      .subscribe(data => {
        this.lang = data;
      });

    this.http.get('../api/profile')
      .subscribe(
      rsp => {
        this.user = rsp;
        this.validator = new Validator(this.user);
      }, error => {
        console.log('fetch user info error');
      }
      )
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
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

  save(form) {
    if (!this.saveProcessing) {
      this.saveProcessing = true;
      this.http.put('../api/profile', form).subscribe(
        rsp => {
          
        }, error => {

        }, () => {
           this.saveProcessing = false;
        }
      )
    }
  }

}
