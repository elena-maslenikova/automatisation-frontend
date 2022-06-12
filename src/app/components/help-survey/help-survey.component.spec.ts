import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSurveyComponent } from './help-survey.component';

describe('HelpSurveyComponent', () => {
  let component: HelpSurveyComponent;
  let fixture: ComponentFixture<HelpSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
