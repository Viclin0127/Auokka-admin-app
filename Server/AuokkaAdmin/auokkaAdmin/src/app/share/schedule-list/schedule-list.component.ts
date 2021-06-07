import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../../model/schedule';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  @Input() schedules: Schedule[] = []
  @Input() color: string = '#ff985d';

  @Output() editHandler = new EventEmitter();
  constructor(public http: DataService) { }

  ngOnInit() {
  }

  convert(price: number) {
    let newPrice = +price.toFixed(2);
    return newPrice;
  }

  toggleActive(index: number) {
    this.schedules[index].active = (this.schedules[index].active == 0 ? 1 : 0);
    if (this.schedules[index].id > 0) {
      this.http.put('../api/schedules/active/' + this.schedules[index].id, this.schedules[index])
        .subscribe();
    }
    
  }
}
