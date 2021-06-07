import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementModule } from '../management.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherRoutingModule } from './teacher-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ManagementModule,
    TeacherRoutingModule
  ]
})
export class TeacherManagementModule { }
