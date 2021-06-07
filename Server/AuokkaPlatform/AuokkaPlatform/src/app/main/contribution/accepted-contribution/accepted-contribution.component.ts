import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Subscription } from 'rxjs';
import { Utils } from '../../../utility/utils';
import { LanguageService } from '../../../service/language/language.service';

@Component({
  selector: 'app-accepted-contribution',
  templateUrl: './accepted-contribution.component.html',
  styleUrls: ['./accepted-contribution.component.css']
})
export class AcceptedContributionComponent implements OnInit, OnDestroy {

  //=========language support section============
  text: any = {
    en: {
      title: 'Accepted contributions',
      download: 'Download',
      submitted: 'Submitted at',
      accepted: 'Accepted'

    },
    cn: {
      title: '已过审',
      download: '下载文件',
      submitted: '提交于',
      accepted: '审核通过'
    }
  }

  lang: string = Utils.getLanguage();

  //=========language support section============

  contributions: any = [];
  langSubscription: Subscription;
  constructor(private http: DataService, private langService: LanguageService) { }

  ngOnInit() {
    this.langSubscription = this.langService.getLanguageSetting()
      .subscribe(data => {
        this.lang = data;
      });
    this.http.get('../api/contribution/approved')
      .subscribe(
      rsp => {
        this.contributions = rsp;
      },
      error => {

      }
      )
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

}
