import { Component, OnInit } from '@angular/core';
import { NavTab } from './nav-tab';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  tabs: NavTab[] = [];

  constructor() {
    this.tabs.push(new NavTab('Contribution', 'contribution'));
    this.tabs.push(new NavTab('Course', 'course'));
    //this.tabs.push(new NavTab('Teacher', 'teacher'));
    //this.tabs.push(new NavTab('Student', 'student'));
  }

  ngOnInit() {
  }

}
