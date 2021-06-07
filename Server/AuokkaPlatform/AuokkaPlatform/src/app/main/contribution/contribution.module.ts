import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionRoutingModule } from './contribution-routing.module';
import { ContributionComponent } from './contribution.component';
import { NewContributionComponent } from './new-contribution/new-contribution.component';
import { AcceptedContributionComponent } from './accepted-contribution/accepted-contribution.component';
import { UnderReviewComponent } from './under-review/under-review.component';
import { FormsModule } from '@angular/forms';
import { SingleContributionComponent } from './single-contribution/single-contribution.component';

@NgModule({
  declarations: [ContributionComponent, NewContributionComponent, AcceptedContributionComponent, UnderReviewComponent, SingleContributionComponent],
  imports: [
    CommonModule,
    ContributionRoutingModule,
    FormsModule
  ]
})
export class ContributionModule { }
