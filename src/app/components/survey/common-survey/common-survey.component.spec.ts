import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSurveyComponent } from './common-survey.component';

describe('CommonSurveyComponent', () => {
  let component: CommonSurveyComponent;
  let fixture: ComponentFixture<CommonSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
