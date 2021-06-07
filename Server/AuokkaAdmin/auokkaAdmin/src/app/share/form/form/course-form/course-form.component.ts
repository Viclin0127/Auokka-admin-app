import { Component, OnInit, Input } from '@angular/core';
import { FormComponent } from '../form.component';
import { DataService } from '../../../../service/data.service';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { Loadable } from '../../../../interface/loadable';
import { Processable } from '../../../../interface/processable';
import { Schedule } from '../../../../model/schedule';
import { ValidatorService } from '../../../../service/validator.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent extends FormComponent implements OnInit, Loadable, Processable {
  @Input() processStatus: number = 0;
  @Input() status: number;
  courseIntro: { title: string, content: string, showOnSide: boolean }[];
  @Input() f;//submit function
  tabs: any[] = [];
  currentStage: number = 0;
  editingSchedule: Schedule = new Schedule();
  schedules: Schedule[] = [];
  showScheduleModal: boolean = false;
  editingIndex: number = -1;
  scheduleProcessingStatus: number = 0;

  checker: Function[] = [];
  imageServer = environment.resourceServer;
  constructor(public http: DataService, public htpclient: HttpClient, public validator: ValidatorService) {
    super(http);
    this.checker.push(() => {
      return this.validator.allValid(['Course Title', 'Course Level', 'Short Description']);
    });
    this.checker.push(() => {
      var labels = [];
      this.courseIntro.forEach((item, index) => {
        labels.push('Title' + index);
        labels.push('Content' + index);
      })
      return this.validator.allValid(labels);
    })
  }

  ngOnInit() {
    this.courseIntro = this.model.id == null ?
      [{ title: 'About This Course', content: '', showOnSide: true },
      { title: 'Course Outcome', content: '', showOnSide: true }]
      : JSON.parse(this.model.detail);
    this.tabs.push({ label: '1.Basic Information', code: 0 });
    this.tabs.push({ label: '2.Detail Information', code: 1 });
    this.tabs.push({ label: '3.Schedule Information', code: 2 });
  }

  submit() {
    this.model.detail = JSON.stringify(this.courseIntro);
    this.model.schedule = this.schedules;
    this.emitter.emit(this.f(this.http, this.model));
    //this.emitter.emit(this.http.post('../api/courses', this.model));
  }

  handleFileUpload(files: FileList) {
    const formData = new FormData();
    let file = files.item(0);
    formData.append(file.name, file);
    const req = new HttpRequest('POST', '../api/courses/uploadimage/' + 'course', formData, {
      reportProgress: false,
    });
    //const req = new HttpRequest('POST', 'http://119.9.52.51:9997/api/files/uploadimage/' + 'course', formData, {
    //  reportProgress: true,
    //});

    this.htpclient.request(req).subscribe(
      res => {
        if (res instanceof HttpResponse) {
          
          if (res['body']['success']) {
            this.model.image = res['body']['message'];

          }
          console.log(this.model);
        }
        
      }, error => {

      }
    );
  }

  addEmptyIntro() {
    this.courseIntro.push({ title: '', content: '', showOnSide: true });
  }

  removeSection(index: number) {
    this.courseIntro.splice(index, 1);
  }

  editSchedule(index: number = -1) {
    if (index == -1) {
      this.editingSchedule = new Schedule();
      this.showScheduleModal = !this.showScheduleModal;
    }
    else {
      this.editingIndex = index;
      this.editingSchedule = this.schedules[index];
      this.showScheduleModal = !this.showScheduleModal;
    }

  }

  scheduleSubmit(request: any) {
    if (request.action == 'add') {
      request.schedule.id = 0;
      this.schedules.push(request.schedule);
      this.showScheduleModal = false;
    }
    else {
      //this.emitter.emit({ rq: this.http.put('../api/schedules/' + this.schedule.id, this.schedule), action: 'update' });
      this.schedules[this.editingIndex] = request.schedule;
      console.log('update');
    }
  }

  valid(value: any, label: string, type: string) {
    if (!this.validator.verify(value, label, type)) {
      return label + ' is required';
    }

  }

  next(currenstage) {
    this.currentStage += (this.checker[currenstage]() ? 1 : 0);
  }
  
}
