import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { Utils } from '../../../utility/utils';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../service/language/language.service';

@Component({
  selector: 'app-new-contribution',
  templateUrl: './new-contribution.component.html',
  styleUrls: ['./new-contribution.component.css']
})
export class NewContributionComponent implements OnInit, OnDestroy {
    
  //=========language support section============
  text: any = {
    en: {
      title: 'New Contribution',
      titleplaceholder: 'Contribution title',
      tagtitle: 'Tags (Maximum 5)',
      tagemptytext: 'No tag has been selected, tags can help the readers to spot your article easily',
      searchtagplaceholder: 'Search tags...',
      dropfiletextdefaultfirstline: 'Drag and drop your.docx file here',
      dropfiletextdefaultsecondline: '(Maximum size: 5MB)',
      dropfilesizeerror: 'Please select a file not greater than 5MB',
      dropfiletypeerror: 'Please select a .docx format file',
      selected: 'Selected file',
      submit:'Submit'
    },
    cn: {
      title: '创建新投稿',
      titleplaceholder: '文章标题',
      tagtitle: '标签（最多5个）',
      tagemptytext: '已选择0个标签，标签可以帮助读者更快地找到您的文章',
      searchtagplaceholder: '搜索标签...',
      dropfiletextdefaultfirstline: '将.docx文件拖拽至此处',
      dropfiletextdefaultsecondline: '（最大不超过5MB）',
      dropfilesizeerror: '文件过大',
      dropfiletypeerror: '格式错误，请选择.docx文件',
      selected: '已选择',
      submit: '提交'
    }
  }

  lang: string = Utils.getLanguage();
  //=========language support section============

  fileBytes: any = '';

  formData: any;

  filename: string = '';
  tags: any = [];
  key: string = '';

  title: any = '';

  searching: boolean = false;

  selectedTag: any = {};

  langSubscription: Subscription;

  submitProcessing: boolean = false;

  constructor(private http: DataService, public htpclient: HttpClient, private langService: LanguageService) {
    
  }

  ngOnInit() {

    this.langSubscription = this.langService.getLanguageSetting()
      .subscribe(data => {
        this.lang = data;
      });

    var dropZone = document.getElementById('dropfile');
    var hiddenFileSelector = document.getElementById('dropfileInput');
    dropZone.addEventListener('dragleave', function (e) {
      dropZone.style.border = '1px solid #dedede';
    })

    // Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
    dropZone.addEventListener('dragover', function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      dropZone.style.border = '2px solid #177fe2';
    });

    // Get file data on drop
    dropZone.addEventListener('drop', function (e) {

      document.getElementById('dropfileNameWrapper').style.display = 'none';
      dropZone.style.border = '1px solid #dedede';
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files; // Array of all files
      let filename = files[0].name;
      this.formData = new FormData();
      this.formData.append('file', files[0], filename);
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        //this.fileBytes = evt.target.result;

        this.filename = filename;
        console.log(this.fileBytes);
        let nameEl = document.getElementById('dropfileName');
        nameEl.innerHTML = filename;
        document.getElementById('dropfileNameWrapper').style.display = 'block';
        document.getElementById('dropfileInstruction').style.display = 'none';
        document.getElementById('dropfileNameError').style.display = 'none';
      }.bind(this);

      let parts = filename.split('.');
      let extension = parts[parts.length - 1];

      if (extension == 'docx' && files[0].size <= 5242880) {
        reader.readAsDataURL(files[0]); // start reading the file data.
      }
      else {
        let errorEl = document.getElementById('dropfileNameError');
        if (files[0].type != 'docx') {
          errorEl.innerHTML = this.text[this.lang].dropfiletypeerror;
        }
        else if (files[0].size > 5242880) {
          document.getElementById('dropfileNameError').innerHTML = this.text[this.lang].dropfilesizeerror;
        }
        document.getElementById('dropfileInstruction').style.display = 'none';
        errorEl.style.display = 'block';
      }
    }.bind(this));

    dropZone.addEventListener('click', function () {
      hiddenFileSelector.click();
    })

  
  }

  searchTag(key: string) {
    this.http.get('../api/tag/' + key)
      .subscribe(
        rsp => {
          this.tags = rsp;
        },
        error => {

        }
      );
  }

  triggerSearch() {
    let tempkey = this.key;
    setTimeout(
      this.compareAndSearch(tempkey, this.searchTag), 1000);

  }

  compareAndSearch(old, searchTag) {
    return function () {
      if (old == (<HTMLInputElement>document.getElementById('key')).value && old.length > 0) {
        searchTag.bind(this)(old);
      }
    }.bind(this);
    
  }
  
  logTags() {
    console.log(this.tags);
  }

  addTag(tag) {
    console.log(tag);
    this.selectedTag[tag.id] = tag.name;
  }

  removeTag(tag) {
    delete this.selectedTag[tag.id];
  }

  get selectedtags() {
    var list = [];
    for (let key in this.selectedTag) {
      list.push({ id: key, name: this.selectedTag[key] });
    }
    return list;
  }

  sendContribution() {
    if (!this.submitProcessing) {
      this.submitProcessing = true;
    }
    else {
      return;
    }
    
    //this.http.post('../api/contribution/uploadpdf', this.formData)
    //.subscribe();

    const req = new HttpRequest('POST', '../api/contribution/uploadpdf', this.formData, {
      reportProgress: false,
    });

    this.htpclient.request(req).subscribe(
      rsp => {
        if (rsp instanceof HttpResponse) {
          {
            if (rsp['body']['success']) {
              let form = {
                title: this.title,
                tags: JSON.stringify(this.selectedtags),
                filename: rsp['body']['message']
              }
              this.http.post('../api/contribution', form).subscribe(
                rsp => {
                  this.title = '';
                  this.selectedTag = {};
                  this.filename = '';
                  document.getElementById('dropfileNameWrapper').style.display = 'none';
                  document.getElementById('dropfileInstruction').style.display = 'block';
                  document.getElementById('dropfileNameError').style.display = 'none';
                }, error => {

                },
                () => {
                  this.submitProcessing = false;
                }
              );
            }
            else {
              this.submitProcessing = false;
            }
          }
        }
      },
      error => {

      }
    );
  }

  handleFileUpload(files) {
    let file = files[0];
    let filename = files[0].name;
    this.formData = new FormData();
    this.formData.append('file', files[0], filename);
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      //this.fileBytes = evt.target.result;

      this.filename = filename;
      console.log(this.fileBytes);
      let nameEl = document.getElementById('dropfileName');
      nameEl.innerHTML = filename;
      document.getElementById('dropfileNameWrapper').style.display = 'block';
      document.getElementById('dropfileInstruction').style.display = 'none';
      document.getElementById('dropfileNameError').style.display = 'none';
    }.bind(this);

    let parts = filename.split('.');
    let extension = parts[parts.length - 1];

    if (extension == 'docx' && files[0].size <= 5242880) {
      reader.readAsDataURL(files[0]); // start reading the file data.
    }
    else {
      let errorEl = document.getElementById('dropfileNameError');
      if (files[0].type != 'docx') {
        errorEl.innerHTML = this.text[this.lang].dropfiletypeerror;
      }
      else if (files[0].size > 5242880) {
        document.getElementById('dropfileNameError').innerHTML = this.text[this.lang].dropfilesizeerror;
      }
      document.getElementById('dropfileInstruction').style.display = 'none';
      errorEl.style.display = 'block';
    }
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }
}
