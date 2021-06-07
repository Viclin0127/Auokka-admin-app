import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolComponent } from './enrol/enrol.component';
import { PaymentComponent } from './payment/payment.component';
import { EnrolSuccessComponent } from './enrol-success/enrol-success.component';

const routes: Routes = [
  { path: ':course', component: EnrolComponent },
  { path: 'payment/:enrollment', component: PaymentComponent },
  { path: 'success/:enrollment', component: EnrolSuccessComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrolRoutingModule { }
