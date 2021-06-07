import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-contribution-list',
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.css']
})
export class ContributionListComponent implements OnInit {
  @Input() api: string = '';
  contributions: any = [];
  selectedTags: any = {};
  constructor(private http: DataService) { }

  ngOnInit() {
    this.http.get(this.api)
      .subscribe(
      rsp => {
        this.contributions = rsp;
      },
      error => {

      }
      );
  }

  changeStatus(id: number, status: number, index: number, reason: string, tags: any) {
    var finalTags = [];
    for (let key in tags) {
      finalTags.push({ id: key, name: tags[key] });
    }
    this.http.put('../api/contribution', { id, approved:status, rejectReason: reason, proposedTags: JSON.stringify(finalTags)})
      .subscribe(
        rsp => {
          this.contributions[index].approved = status;
          if (status == -1) {
            this.contributions[index].rejectReason = reason;
          }
          if (status == 1) {
            this.contributions[index].tags = finalTags;
          }
          
        },
        error => {

        }
      );
  }

  reject(id: number, status: number, index: number, reason: string) {
    let body = document.getElementsByTagName('body')[0];

    let background = document.createElement('div');
    background.style.width = '100vw';
    background.id = 'background';
    background.style.height = '100vh';
    background.style.backgroundColor = 'rgba(0,0,0,0.2)';
    background.style.position = 'fixed';
    background.style.top = '0';
    
    let modalWrapper = document.createElement('div');
    modalWrapper.style.width = '100vw';
    modalWrapper.style.height = '100vh';
    modalWrapper.style.display = 'flex';
    modalWrapper.addEventListener('click', function (e) {
      if (e.target == modalWrapper) {
        background.parentNode.removeChild(background);
      }

    });

    let modalBody = document.createElement('div');
    modalBody.style.minWidth = '500px';
    modalBody.style.minHeight = '300px';
    modalBody.style.margin = 'auto';
    modalBody.style.backgroundColor = 'white';
    modalBody.style.padding = '30px';

    let bodyTitle = document.createElement('div');
    bodyTitle.innerHTML = 'Please enter your reason for rejection';
    bodyTitle.style.marginBottom = '20px';

    let textarea = document.createElement('textarea');
    textarea.style.width = '500px';
    textarea.style.height = '300px';
    textarea.id = 'textarea';
    textarea.value = reason;

    let bodyFooter = document.createElement('div');
    bodyFooter.style.marginTop = '10px';

    let rejectBtn = document.createElement('button');
    rejectBtn.classList.add('btn');
    rejectBtn.classList.add('bg-red');
    rejectBtn.innerHTML = 'Confirm'
    rejectBtn.addEventListener('click', function () {
      this.changeStatus(id, status, index, textarea.value);
      background.parentNode.removeChild(background);
    }.bind(this));

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn');
    cancelBtn.classList.add('bg-dark');
    cancelBtn.classList.add('mx-1');
    cancelBtn.innerHTML = 'Cancel'
    cancelBtn.addEventListener('click', function (e) {
      background.parentNode.removeChild(background);

    });

    bodyFooter.appendChild(rejectBtn);
    bodyFooter.appendChild(cancelBtn);
    modalBody.appendChild(bodyTitle);
    modalBody.appendChild(textarea);
    modalBody.appendChild(bodyFooter);
    modalWrapper.appendChild(modalBody);
    background.appendChild(modalWrapper);
    body.appendChild(background);
  }

  approve(id: number, status: number, index: number, tags: any) {
    let refreshFinalTag = function (ftags) {
      let ftagsContainer = document.getElementById('finaltags');
      ftagsContainer.innerHTML = "";
      for (let key in ftags) {
        console.log('select')
        let tag = document.createElement('span');
        tag.style.margin = '0px 10px 0px 0px';
        tag.style.cursor = 'pointer';
        tag.style.fontSize = '10pt';
        tag.classList.add('rounded');
        tag.classList.add('border');
        tag.style.padding = '5px';
        tag.innerHTML = ftags[key];
        tag.addEventListener('click', function () {
          delete this.selectedTags[key];
          refreshFinalTag(this.selectedTags);
        }.bind(this))
        ftagsContainer.appendChild(tag);
      }
    }.bind(this)

    this.selectedTags = {};
    let body = document.getElementsByTagName('body')[0];

    let background = document.createElement('div');
    background.style.width = '100vw';
    background.id = 'background';
    background.style.height = '100vh';
    background.style.backgroundColor = 'rgba(0,0,0,0.2)';
    background.style.position = 'fixed';
    background.style.top = '0';

    let modalWrapper = document.createElement('div');
    modalWrapper.style.width = '100vw';
    modalWrapper.style.height = '100vh';
    modalWrapper.style.display = 'flex';
    modalWrapper.addEventListener('click', function (e) {
      if (e.target == modalWrapper) {
        background.parentNode.removeChild(background);
      }

    });

    let modalBody = document.createElement('div');
    modalBody.style.minWidth = '500px';
    modalBody.style.minHeight = '300px';
    modalBody.style.margin = 'auto';
    modalBody.style.backgroundColor = 'white';
    modalBody.style.padding = '30px';
    modalBody.style.position = 'relative';

    let bodyTitle = document.createElement('div');
    bodyTitle.style.fontWeight = '700';
    bodyTitle.innerHTML = 'Please select the tags to be displayed';
    bodyTitle.style.marginBottom = '5px';

    let usertags = document.createElement('div');
    usertags.style.display = 'flex';
    usertags.style.flexWrap = 'wrap';
    usertags.style.marginBottom = '20px';

    let searchBar = document.createElement('input');
    searchBar.placeholder = 'Search tags...';
    searchBar.addEventListener('keyup', function () {
      
      this.http.get('../api/tag/' + searchBar.value)
      .subscribe(
        rsp => {
          let searchTags = document.getElementById('searchtags');
          searchTags.innerHTML = '';
          let tag = document.createElement('span');
          tag.style.margin = '0px 10px 0px 0px';
          tag.style.cursor = 'pointer';
          tag.style.fontSize = '10pt';
          tag.classList.add('rounded');
          tag.classList.add('border');
          tag.style.padding = '5px';
          tag.innerHTML = searchBar.value;
          tag.addEventListener('click', function () {

            this.selectedTags[searchBar.value] = searchBar.value;
            refreshFinalTag(this.selectedTags);
          }.bind(this))
          searchTags.appendChild(tag);
          for (let t of rsp) {
            let tag = document.createElement('span');
            tag.style.margin = '0px 10px 0px 0px';
            tag.style.cursor = 'pointer';
            tag.style.fontSize = '10pt';
            tag.classList.add('rounded');
            tag.classList.add('border');
            tag.style.padding = '5px';
            tag.innerHTML = t.name;
            tag.addEventListener('click', function () {

              this.selectedTags[t.id] = t.name;
              refreshFinalTag(this.selectedTags);
            }.bind(this))
            searchTags.appendChild(tag);
          }
        }, error => {

        }
      );
    }.bind(this));

    let searchResult = document.createElement('div');
    searchResult.style.display = 'flex';
    searchResult.style.flexWrap = 'wrap';
    searchResult.style.marginBottom = '20px';
    searchResult.style.marginTop = '10px';
    searchResult.id = 'searchtags';

    let selectedTitle = document.createElement('div');
    selectedTitle.style.fontWeight = '700';
    selectedTitle.innerHTML = 'Selected tags';
    selectedTitle.style.marginBottom = '5px';

    for (let t of tags) {
      let tag = document.createElement('span');
      tag.style.margin = '0px 10px 0px 0px';
      tag.style.cursor = 'pointer';
      tag.style.fontSize = '10pt';
      tag.classList.add('rounded');
      tag.classList.add('border');
      tag.style.padding = '5px';
      tag.innerHTML = t.name;
      tag.addEventListener('click', function () {
        
        this.selectedTags[t.id] = t.name;
        refreshFinalTag(this.selectedTags);
      }.bind(this))
      usertags.appendChild(tag);
    }
    
    let finaltags = document.createElement('div');
    finaltags.style.display = 'flex';
    finaltags.style.flexWrap = 'wrap';
    finaltags.id = 'finaltags'

    let bodyFooter = document.createElement('div');
    bodyFooter.style.position = 'absolute';
    bodyFooter.style.bottom = '0px';
    bodyFooter.style.paddingBottom = '30px';

    let confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn');
    confirmBtn.classList.add('bg-green');
    confirmBtn.innerHTML = 'Confirm'
    confirmBtn.addEventListener('click', function () {
      this.changeStatus(id, status, index, '', this.selectedTags);
      background.parentNode.removeChild(background);
    }.bind(this));

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn');
    cancelBtn.classList.add('bg-dark');
    cancelBtn.classList.add('mx-1');
    cancelBtn.innerHTML = 'Cancel'
    cancelBtn.addEventListener('click', function (e) {
      background.parentNode.removeChild(background);

    });

    modalBody.appendChild(bodyTitle);
    modalBody.appendChild(usertags);
    modalBody.appendChild(searchBar);
    modalBody.appendChild(searchResult);
    modalBody.appendChild(selectedTitle);
    modalBody.appendChild(finaltags);
    bodyFooter.appendChild(confirmBtn);
    bodyFooter.appendChild(cancelBtn);
    modalBody.appendChild(bodyFooter);
    modalWrapper.appendChild(modalBody);
    background.appendChild(modalWrapper);
    body.appendChild(background);
    refreshFinalTag(this.selectedTags);
  }
}
