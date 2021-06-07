import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from '../field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() content = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    this.field.value = event;
    this.content.emit(this.field);
  }
}
