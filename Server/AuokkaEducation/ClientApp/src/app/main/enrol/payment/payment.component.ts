import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public http: DataService) { }

  ngOnInit() {

  }

}
