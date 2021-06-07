import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributionComponent } from './contribution.component';
import { NewContributionComponent } from './new-contribution/new-contribution.component';
import { AcceptedContributionComponent } from './accepted-contribution/accepted-contribution.component';
import { UnderReviewComponent } from './under-review/under-review.component';



const routes: Routes = [{
  path: '',
  component: ContributionComponent,
  children: [
    { path: '', redirectTo: 'new' },
    { path: 'new', component: NewContributionComponent },
    { path: 'accepted', component: AcceptedContributionComponent },
    { path: 'review', component: UnderReviewComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributionRoutingModule { }
