import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../column';
import { DatePipe } from '@angular/common'
@Component({
  providers: [DatePipe],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() models: any[];
  @Input() column: Column[] = [];
  @Output() emitter = new EventEmitter();

  parseData: Map<string, Function> = new Map<string, Function>()

  constructor(public datepipe: DatePipe) {
    this.parseData['text'] = (data) => { return data };
    this.parseData['number'] = (data) => { return data };
    this.parseData['datetime'] = (data) => { return this.datepipe.transform(data, 'yyyy-MM-dd hh:mm'); };
    this.parseData['date'] = (data) => { return this.datepipe.transform(data, 'yyyy-MM-dd'); };
  }

  ngOnInit() {
    
  }

  getData(model, column: Column) {
    var data = model;
    for (let a of column.attribute) {
      data = data[a];
    }
    return this.parseData[column.type](data);
  }

  sort(column: Column) {
    if (column.sortOrder == Column.ASCENDING) {
      this.models = this.models.sort((a, b) => {
        if (this.getData(a, column) > this.getData(b, column)) {
          return 1;
        }
        else {
          return -1
        }

      });
      column.sortOrder = Column.DESCENDING;
    }
    else {
      this.models = this.models.sort((a, b) => {
        if (this.getData(a, column) < this.getData(b, column)) {
          return 1;
        }
        else {
          return -1
        }

      });
      column.sortOrder = Column.ASCENDING;
    }
    
  }
}
