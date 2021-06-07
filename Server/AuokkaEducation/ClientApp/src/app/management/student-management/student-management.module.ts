import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementShareModule } from '../management-share/management-share.module';
import { StudentRoutingModule } from './student-routing.module';
import { StudentMainComponent } from './student-main/student-main.component';
import { CourseBoardComponent } from './course-board/course-board.component';


@NgModule({
  declarations: [DashboardComponent, StudentMainComponent, CourseBoardComponent],
  imports: [
    CommonModule,
    ManagementShareModule,
    StudentRoutingModule,
    
  ]
})
export class StudentManagementModule { }
