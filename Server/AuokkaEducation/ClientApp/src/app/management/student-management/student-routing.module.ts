import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentMainComponent } from './student-main/student-main.component';

const routes: Routes = [
  {
    path: '',
    component: StudentMainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', component: DashboardComponent }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
