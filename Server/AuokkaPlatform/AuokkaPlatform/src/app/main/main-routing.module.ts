import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [{
  path: '',
  component: IndexComponent,
  children: [
    { path: '', redirectTo: 'contribution', pathMatch: 'full'  },
    { path: 'contribution', loadChildren: './contribution/contribution.module#ContributionModule' },
    { path: 'profile', component: ProfileComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
