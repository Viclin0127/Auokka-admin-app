import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {

  tabs: { label: string, code: number }[] = [];
  mode: number = 0;
  constructor() {
    this.tabs.push({ label: 'Waiting for review', code: 0 });
    this.tabs.push({ label: 'Rejected', code: 2 });
    this.tabs.push({ label: 'Ready for publish', code: 1 });
    //this.tabs.push({ label: 'Published', code: 3 });
  }

  ngOnInit() {
  }

}
