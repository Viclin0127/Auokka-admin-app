import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolRoutingModule } from './enrol-routing.module';
import { EnrolComponent } from './enrol/enrol.component';
import { FormModule } from '../../form/form.module';
import { PaymentComponent } from './payment/payment.component';
import { EnrolSuccessComponent } from './enrol-success/enrol-success.component';

@NgModule({
  declarations: [
    EnrolComponent,
    PaymentComponent,
    EnrolSuccessComponent
  ],
  imports: [
    CommonModule,
    EnrolRoutingModule,
    FormModule
  ]
})
export class EnrolModule { }
