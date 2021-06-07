import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolSuccessComponent } from './enrol-success.component';

describe('EnrolSuccessComponent', () => {
  let component: EnrolSuccessComponent;
  let fixture: ComponentFixture<EnrolSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
