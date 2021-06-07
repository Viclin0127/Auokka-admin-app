import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { CourseRoutingModule } from './course-routing.module';
import { FormsModule } from '@angular/forms';
import { CourseAddComponent } from './course-add/course-add.component';
import { FormModule } from '../share/form/form.module';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [CourseComponent, CourseAddComponent, CourseEditComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    FormModule,
    ShareModule

  ]
})
export class CourseModule { }
