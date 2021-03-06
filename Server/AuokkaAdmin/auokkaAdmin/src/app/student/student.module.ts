import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';
import { FormModule } from '../share/form/form.module';
import { TableModule } from '../share/table/table.module';

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormModule
  ]
})
export class StudentModule { }
