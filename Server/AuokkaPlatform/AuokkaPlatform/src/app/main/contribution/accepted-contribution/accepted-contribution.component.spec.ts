import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedContributionComponent } from './accepted-contribution.component';

describe('AcceptedContributionComponent', () => {
  let component: AcceptedContributionComponent;
  let fixture: ComponentFixture<AcceptedContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
