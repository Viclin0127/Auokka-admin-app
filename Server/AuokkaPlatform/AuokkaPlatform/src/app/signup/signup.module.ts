import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule } from '@angular/forms';
import { SignUpConfirmComponent } from './sign-up-confirm/sign-up-confirm.component';
@NgModule({
  declarations: [SignupComponent, SignUpConfirmComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule
  ]
})
export class SignupModule { }
