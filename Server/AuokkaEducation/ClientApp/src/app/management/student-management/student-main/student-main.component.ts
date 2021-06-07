import { Component, OnInit } from '@angular/core';
import { NavTab } from '../../management-share/management-navigation/nav-tab';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit {

  tabs: NavTab[] = [];

  constructor() {
    this.tabs.push(new NavTab('Dashboard', 'dashboard'));
  }

  ngOnInit() {
  }

}
