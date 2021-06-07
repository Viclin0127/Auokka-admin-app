import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeedLoginPageComponent } from './need-login-page/need-login-page.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NeedLoginPageComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NeedLoginPageComponent, FooterComponent]
})
export class ShareModule { }
