import { Component, OnInit } from '@angular/core';
import { Utils } from '../../utility/utils';
import { LanguageService } from '../../service/language/language.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  text: any = {
    en: {
      contribution: 'Contribution',
      newcontribution: 'New contribution',
      acceptedcontribution: 'Accepted contribution',
      underreview: 'Under review',
      profile: 'Profile'
    },
    cn: {
      contribution: '投稿',
      newcontribution: '创建新投稿',
      acceptedcontribution: '已过审',
      underreview: '审核中',
      profile: '用户资料'
    }
  }

  lang: string = Utils.getLanguage();
  setLanguage(lang: string) {
    Utils.setLanguage(lang);
    this.lang = Utils.getLanguage();
    this.langService.setLanguage(this.lang);
  }

  constructor(private langService: LanguageService) { }

  ngOnInit() {
  }

}
