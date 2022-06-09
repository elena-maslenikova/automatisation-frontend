import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspdnSurveyComponent } from './ispdn-survey.component';

describe('IspdnSurveyComponent', () => {
  let component: IspdnSurveyComponent;
  let fixture: ComponentFixture<IspdnSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IspdnSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IspdnSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
