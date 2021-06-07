import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent implements OnInit {
  @Input() header: string;
  constructor() { }

  ngOnInit() {
  }

}
