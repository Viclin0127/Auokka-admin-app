import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionRoutingModule } from './contribution-routing.module';
import { ContributionComponent } from './contribution.component';
import { ShareModule } from '../share/share.module';
import { ContributionListComponent } from './contribution-list/contribution-list.component';

@NgModule({
  declarations: [ContributionComponent, ContributionListComponent],
  imports: [
    CommonModule,
    ContributionRoutingModule,
    ShareModule
  ]
})
export class ContributionModule { }
