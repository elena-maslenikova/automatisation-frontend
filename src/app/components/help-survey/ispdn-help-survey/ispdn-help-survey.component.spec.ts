import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspdnHelpSurveyComponent } from './ispdn-help-survey.component';

describe('IspdnHelpSurveyComponent', () => {
  let component: IspdnHelpSurveyComponent;
  let fixture: ComponentFixture<IspdnHelpSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IspdnHelpSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IspdnHelpSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
