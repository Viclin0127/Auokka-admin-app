import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

  @Input() tabs: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
