import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FieldComponent } from './form/field/field.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CourseFormComponent } from './form/course-form/course-form.component';
import { CourseEditFormComponent } from './form/course-edit-form/course-edit-form.component';
import { ShareModule } from '../share.module';
import { ScheduleFormComponent } from './form/schedule-form/schedule-form.component';
import { TeacherFormComponent } from './form/teacher-form/teacher-form.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [FormComponent, FieldComponent, CourseFormComponent, CourseEditFormComponent, ScheduleFormComponent, TeacherFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ShareModule,
    RouterModule
  ],
  exports: [CourseFormComponent, CourseEditFormComponent, ScheduleFormComponent, TeacherFormComponent]
})
export class FormModule { }
