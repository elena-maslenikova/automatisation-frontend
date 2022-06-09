import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonSurvey } from '@app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-common-survey',
  templateUrl: './common-survey.component.html',
  styleUrls: ['./common-survey.component.scss']
})
export class CommonSurveyComponent implements OnInit, OnDestroy {
  @Output() isSurveyResultChanged: EventEmitter<CommonSurvey> = new EventEmitter();

  surveyForm: FormGroup = this.formBuilder.group({
    government: new FormControl(),
    webResources: new FormControl(),
    publicWebResources: new FormControl(),
    publicPerception: new FormControl(),
  });

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        if (!value.webResources) {
          this.surveyForm.get('publicWebResources')?.setValue(null, { emitEvent: false });
        }

        const newValue = this.surveyForm.value;
        const surveyResult: CommonSurvey = {
          government: newValue.government,
          webResources: newValue.webResources,
          publicWebResources: newValue.publicWebResources,
          publicPerception: newValue.publicPerception
        };

        this.isSurveyResultChanged.emit(surveyResult);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
