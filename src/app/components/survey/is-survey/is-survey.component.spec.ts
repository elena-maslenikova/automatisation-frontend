import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsSurveyComponent } from './is-survey.component';

describe('IsSurveyComponent', () => {
  let component: IsSurveyComponent;
  let fixture: ComponentFixture<IsSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
