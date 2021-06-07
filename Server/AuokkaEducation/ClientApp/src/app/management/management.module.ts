import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management/management.component';
import { ManagementRoutingModule } from './management-routing.module';

@NgModule({
  declarations: [ManagementComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
