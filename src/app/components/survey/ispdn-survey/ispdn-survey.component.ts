import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IspdnTypes } from '@app/constants';
import { IsIspdnSurvey } from '@app/models';
import { SurveySelectors, UpdatePdnTypes } from '@app/store/survey';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ispdn-survey',
  templateUrl: './ispdn-survey.component.html',
  styleUrls: ['./ispdn-survey.component.scss']
})
export class IspdnSurveyComponent implements OnInit, OnDestroy {
  @Select(SurveySelectors.pdnTypes) pdnTypes$: Observable<string[]>;
  @Output() isSurveyResultChanged: EventEmitter<IsIspdnSurvey> = new EventEmitter();

  surveyForm: FormGroup = this.formBuilder.group({
    pdnTypes: this.formBuilder.array(this.store.selectSnapshot(SurveySelectors.pdnTypes) || [], Validators.required),
    governmentPdn: new FormControl(),
    accounting: new FormControl()
  });
  ispdnTypes = IspdnTypes;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.pdnTypes$.subscribe((types) => {
        if (!types) return;

        this.surveyForm.patchValue(
          { pdnTypes: types },
          { emitEvent: false }
        );

        this.isSurveyResultChanged.emit(this.getSurveyResult());
      })
    );

    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        this.isSurveyResultChanged.emit(this.getSurveyResult());
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
    this.store.dispatch(new UpdatePdnTypes(this.surveyForm.get('pdnTypes').value));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getSurveyResult(): IsIspdnSurvey {
    const value = this.surveyForm.value;

    const surveyResult: IsIspdnSurvey = {
      pdnTypes: value.pdnTypes,
      governmentPdn: value.governmentPdn,
      accounting: value.accounting
    };
    return surveyResult;
  }

}
