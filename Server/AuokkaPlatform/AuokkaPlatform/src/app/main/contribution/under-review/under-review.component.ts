import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { Subscription } from 'rxjs';
import { Utils } from '../../../utility/utils';
import { LanguageService } from '../../../service/language/language.service';

@Component({
  selector: 'app-under-review',
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.css']
})
export class UnderReviewComponent implements OnInit, OnDestroy {
  //=========language support section============
  text: any = {
    en: {
      title: 'Under review',
      download: 'Download',
      submitted: 'Submitted at',
      rejected: 'Rejected',
      underreview: 'Under review'

    },
    cn: {
      title: '审核中',
      download: '下载文件',
      submitted: '提交于',
      rejected: '审核不通过',
      underreview: '审核中'
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
    this.http.get('../api/contribution/review')
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
