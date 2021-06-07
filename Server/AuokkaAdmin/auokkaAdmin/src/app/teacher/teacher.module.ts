import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormModule } from '../share/form/form.module';

@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormModule
  ]
})
export class TeacherModule { }
