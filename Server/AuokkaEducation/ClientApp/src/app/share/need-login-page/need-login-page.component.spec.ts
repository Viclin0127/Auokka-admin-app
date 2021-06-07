import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedLoginPageComponent } from './need-login-page.component';

describe('NeedLoginPageComponent', () => {
  let component: NeedLoginPageComponent;
  let fixture: ComponentFixture<NeedLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
