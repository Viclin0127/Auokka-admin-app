import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../../model/schedule';
import { DisplayCourse } from '../../../display-model/display-course';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: DisplayCourse;
  imageServer = environment.resourceServer;
  constructor() {
   
  }

  ngOnInit() {
  }

}
