import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';

import { SignupRoutingModule } from './signup-routing.module';
import { FormModule } from '../../form/form.module';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

@NgModule({
  declarations: [SignUpComponent, SignupSuccessComponent],
  imports: [
    CommonModule,
    FormModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
