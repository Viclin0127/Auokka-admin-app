import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Field } from './field';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() title: string;
  @Input() fields: Field[] = [];
  @Output() emitter = new EventEmitter();
  @Input() buttonText: string = 'Submit';
  @Input() model: any;

  constructor(public http: DataService) {
   
  }

  ngOnInit() {
    
  }

  updateField(index, event: Field) {
    this.model[event.title.toLowerCase()] = event.value;
  }

  submit() {

  }

}
