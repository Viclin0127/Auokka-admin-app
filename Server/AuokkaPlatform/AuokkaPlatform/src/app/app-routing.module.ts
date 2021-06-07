import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'signin', loadChildren: './signin/signin.module#SigninModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'main', loadChildren: './main/main.module#MainModule' },
  { path: '', redirectTo: '/main/contribution/review', pathMatch: 'full'  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
