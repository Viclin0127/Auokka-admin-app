import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      { path: 'student', loadChildren: './student-management/student-management.module#StudentManagementModule'},
      { path: 'teacher', loadChildren: './teacher-management/teacher-management.module#TeacherManagementModule' }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
