import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IspdnTypes } from '@app/constants';
import { IsIspdnSurvey } from '@app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ispdn-survey',
  templateUrl: './ispdn-survey.component.html',
  styleUrls: ['./ispdn-survey.component.scss']
})
export class IspdnSurveyComponent implements OnInit, OnDestroy {
  @Output() isSurveyResultChanged: EventEmitter<IsIspdnSurvey> = new EventEmitter();

  surveyForm: FormGroup = this.formBuilder.group({
    pdnTypes: this.formBuilder.array([], Validators.required),
    governmentPdn: new FormControl(),
    accounting: new FormControl()
  });
  ispdnTypes = IspdnTypes;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        const surveyResult: IsIspdnSurvey = {
          pdnTypes: value.pdnTypes,
          governmentPdn: value.governmentPdn,
          accounting: value.accounting
        };

        this.isSurveyResultChanged.emit(surveyResult);
      })
    );
  }

  onCheckboxChange(typeKey: string) {
    const pdnTypes: FormArray = this.surveyForm.get('pdnTypes') as FormArray;
    if (pdnTypes.value?.includes(typeKey)) {
      pdnTypes.controls.forEach((item, index) => {
        if (item.value == typeKey) {
          pdnTypes.removeAt(index);
          return;
        }
      });
    } else {
      pdnTypes.push(new FormControl(typeKey));
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
