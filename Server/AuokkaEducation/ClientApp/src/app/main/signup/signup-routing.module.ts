import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'success', component: SignupSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
