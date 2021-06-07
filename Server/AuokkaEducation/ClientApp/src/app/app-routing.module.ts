import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'main', loadChildren: './main/main.module#MainModule' },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'management', loadChildren: './management/management.module#ManagementModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
