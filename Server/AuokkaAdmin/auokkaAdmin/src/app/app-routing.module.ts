import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'course', loadChildren: './course/course.module#CourseModule' },
  { path: 'student', loadChildren: './student/student.module#StudentModule' },
  { path: 'teacher', loadChildren: './teacher/teacher.module#TeacherModule' },
  { path: 'contribution', loadChildren: './contribution/contribution.module#ContributionModule' },
  { path: '', redirectTo: 'contribution', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
