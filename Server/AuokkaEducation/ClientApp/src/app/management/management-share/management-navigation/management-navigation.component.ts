import { Component, OnInit, Input } from '@angular/core';
import { NavTab } from './nav-tab';

@Component({
  selector: 'app-management-navigation',
  templateUrl: './management-navigation.component.html',
  styleUrls: ['./management-navigation.component.css']
})
export class ManagementNavigationComponent implements OnInit {

  @Input() tabs: NavTab[] = [];

  constructor() { }

  ngOnInit() {
  }

}
