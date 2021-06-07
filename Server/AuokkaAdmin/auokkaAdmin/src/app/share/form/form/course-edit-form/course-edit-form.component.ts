import { Component, OnInit, Input } from '@angular/core';
import { FormComponent } from '../form.component';
import { DataService } from '../../../../service/data.service';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { Schedule } from '../../../../model/schedule';
import { LoadStatus } from '../../../../utility/load-status';
import { ValidatorService } from '../../../../service/validator.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-course-edit-form',
  templateUrl: './course-edit-form.component.html',
  styleUrls: ['./course-edit-form.component.css']
})
export class CourseEditFormComponent extends FormComponent implements OnInit {

  @Input() processStatus: number = 0;
  @Input() status: number;
  courseIntro: { title: string, content: string, showOnSide: boolean }[];
  @Input() f;//submit function
  currentStage: number = 0;
  tabs: { label: string, code: number }[] = [];
  showScheduleModal: boolean = false;
  editingIndex: number = -1;
  editingSchedule: Schedule = new Schedule();
  scheduleProcessingStatus: number = 0;

  imageServer = environment.resourceServer;

  constructor(public http: DataService, public htpclient: HttpClient, public validator: ValidatorService) {
    super(http);
    this.tabs.push({ label: 'Basic Information', code: 0 });
    this.tabs.push({ label: 'Detail Information', code: 1 });
    this.tabs.push({ label: 'Schedule Information', code: 2 });
  }

  ngOnInit() {
    this.courseIntro = this.model.id == null ?
      [{ title: 'About This Course', content: '', showOnSide: true },
      { title: 'Course Outcome', content: '', showOnSide: true }]
      : JSON.parse(this.model.detail);

  }

  submit() {
    this.model.detail = JSON.stringify(this.courseIntro);
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
      this.editingSchedule.courseId = this.model.id;
      this.showScheduleModal = !this.showScheduleModal;
    }
    else {
      this.editingIndex = index;
      this.editingSchedule = this.model.schedule[index];
      this.showScheduleModal = !this.showScheduleModal;
    }
    
  }

  scheduleSubmit(request: any) {
    this.scheduleProcessingStatus = LoadStatus.PROCESSING;
    if (request.schedule.id == null) {
      this.http.post('../api/schedules', request.schedule)
        .subscribe(
          res => {
            this.model.schedule.push(res);
            this.showScheduleModal = false;
            this.scheduleProcessingStatus = LoadStatus.PROCESSING_SUCCESS;
          },
          error => {
            this.scheduleProcessingStatus = LoadStatus.PROCESSING_ERROR;
          }
        );
    }
    else {
      //this.emitter.emit({ rq: this.http.put('../api/schedules/' + this.schedule.id, this.schedule), action: 'update' });
      this.http.put('../api/schedules/' + request.schedule.id, request.schedule)
        .subscribe(
          res => {
            res['from'] = new Date(res['from']);
            res['to'] = new Date(res['to']);
            this.model.schedule[this.editingIndex] = <Schedule>res;
            //this.editingSchedule = <Schedule>res;
            this.scheduleProcessingStatus = LoadStatus.PROCESSING_SUCCESS;

          },
          error => {
            this.scheduleProcessingStatus = LoadStatus.PROCESSING_ERROR;
          }
        );
    }
  }

  valid(value: any, label: string, type: string) {
    if (!this.validator.verify(value, label, type)) {
      return label + ' is required';
    }

  }
}
