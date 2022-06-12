import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsutpHelpSurveyComponent } from './asutp-help-survey.component';

describe('AsutpHelpSurveyComponent', () => {
  let component: AsutpHelpSurveyComponent;
  let fixture: ComponentFixture<AsutpHelpSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsutpHelpSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsutpHelpSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
