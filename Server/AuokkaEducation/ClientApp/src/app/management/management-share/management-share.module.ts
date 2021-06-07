import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementNavigationComponent } from './management-navigation/management-navigation.component';
import { RouterModule } from '@angular/router';
import { ManagementHeaderComponent } from './management-header/management-header.component';

@NgModule({
  declarations: [ManagementNavigationComponent, ManagementHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ManagementNavigationComponent, ManagementHeaderComponent]
})
export class ManagementShareModule { }
