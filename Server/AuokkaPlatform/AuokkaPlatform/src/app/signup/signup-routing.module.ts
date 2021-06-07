import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignUpConfirmComponent } from './sign-up-confirm/sign-up-confirm.component';

const routes: Routes = [{
  path: '',
  component: SignupComponent
},
  {
    path: 'validation',
    component: SignUpConfirmComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
