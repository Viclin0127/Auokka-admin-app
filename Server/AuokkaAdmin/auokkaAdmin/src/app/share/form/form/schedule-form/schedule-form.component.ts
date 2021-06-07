import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../../../../model/schedule';
import { FormComponent } from '../form.component';
import { DataService } from '../../../../service/data.service';
import { Processable } from '../../../../interface/processable';
import { LoadStatus } from '../../../../utility/load-status';
import { DatePipe } from '@angular/common';

@Component({
  providers: [DatePipe],
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent extends FormComponent implements OnInit, Processable {
  @Input() processStatus: number = LoadStatus.IDLE;
  @Input() schedule: Schedule = new Schedule();
  @Output() emitter = new EventEmitter();
  constructor(public http: DataService, public datePipe: DatePipe) {
    super(http);
    
    
  }

  ngOnInit() {
    if (this.schedule.id != null) {
      this.schedule.from = new Date(this.schedule.from);
      this.schedule.to = new Date(this.schedule.to);
    }
    
  }

  submit() {
    if (this.schedule.id == null) {
      this.emitter.emit({ schedule: this.schedule, action: 'add' });
    }
    else {
      this.emitter.emit({ schedule: this.schedule, action: 'update' });
    }
    
    
    
  }

  handleDateChange(field: string, event) {
    this.schedule[field] = event;
  }

  toggleActive(event) {
    this.schedule.active = (event.target.checked ? 1 : 0);
  }
}
