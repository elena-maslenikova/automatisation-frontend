import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiHelpSurveyComponent } from './kii-help-survey.component';

describe('KiiHelpSurveyComponent', () => {
  let component: KiiHelpSurveyComponent;
  let fixture: ComponentFixture<KiiHelpSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KiiHelpSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiHelpSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
