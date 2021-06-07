import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  declarations: [NavigationComponent, ScheduleListComponent, ScheduleListComponent, TabBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavigationComponent, ScheduleListComponent, TabBarComponent]
})
export class ShareModule { }
