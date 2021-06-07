import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingCourseComponent } from './training-course/training-course.component';
import { ResourceComponent } from './resource/resource.component';
import { NewsComponent } from './news/news.component';
import { CareerComponent } from './career/career.component';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { NeedLoginPageComponent } from '../share/need-login-page/need-login-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'train', component: TrainingCourseComponent},
      { path: 'resource', component: ResourceComponent },
      { path: 'news', component: NewsComponent },
      { path: 'career', component: CareerComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'course/:course', component: CourseInfoComponent },
      { path: '', component: HomeComponent },
      { path: 'enrol', loadChildren: './enrol/enrol.module#EnrolModule' },
      { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
      { path: 'needlogin', component: NeedLoginPageComponent }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
