import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { SignUpFormComponent } from './form/sign-up-form/sign-up-form.component';
import { EnrolFormComponent } from './form/enrol-form/enrol-form.component';
import { FieldComponent } from './form/field/field.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [FormComponent, SignUpFormComponent, EnrolFormComponent, FieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [SignUpFormComponent, EnrolFormComponent]
})
export class FormModule { }
