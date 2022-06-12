import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisHelpSurveyComponent } from './gis-help-survey.component';

describe('GisHelpSurveyComponent', () => {
  let component: GisHelpSurveyComponent;
  let fixture: ComponentFixture<GisHelpSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GisHelpSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GisHelpSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
