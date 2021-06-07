import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';

import { NavigationComponent } from './navigation/navigation.component';
import { TrainingCourseComponent } from './training-course/training-course.component';
import { NewsComponent } from './news/news.component';
import { ResourceComponent } from './resource/resource.component';
import { CareerComponent } from './career/career.component';
import { MainRoutingModule } from './main-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    MainComponent,
    NavigationComponent,
    TrainingCourseComponent,
    NewsComponent,
    ResourceComponent,
    CareerComponent,
    AboutUsComponent,
    HomeComponent,
    CourseListComponent,
    CourseItemComponent,
    CourseInfoComponent,
    TeacherListComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    MainRoutingModule,
    ShareModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
