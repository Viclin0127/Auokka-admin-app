import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent, ProfileComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
