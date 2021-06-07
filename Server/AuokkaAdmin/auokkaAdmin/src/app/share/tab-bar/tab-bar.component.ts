import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  @Input() tabs: {label: string, code: number}[];
  @Input() current: number = 0;

  @Input() switchable = true;

  @Input() inOrder = false;
  constructor() { }

  ngOnInit() {
  }

  emit(code: number, index: number) {
    if (this.switchable) {
      this.current = index;
      this.emitter.emit(code);
    }
  }
}
