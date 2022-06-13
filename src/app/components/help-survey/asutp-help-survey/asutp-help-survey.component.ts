import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataSignificanceLevel, DataSignificanceLevels, ProtectionClass } from '@app/constants';
import { IsSurvey } from '@app/models';
import { SurveySelectors, UpdateSurvey } from '@app/store/survey';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-asutp-help-survey',
  templateUrl: './asutp-help-survey.component.html',
  styleUrls: ['./asutp-help-survey.component.scss']
})
export class AsutpHelpSurveyComponent implements OnInit, OnDestroy {
  @Select(SurveySelectors.isSurvey) isSurvey$: Observable<IsSurvey>;

  surveyForm: FormGroup = this.formBuilder.group({
    isAsutp: new FormControl(),
    significanceLevel: new FormControl()
  });
  dataSignificanceLevels = DataSignificanceLevels;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        const isSurvey = Object.assign({}, this.store.selectSnapshot(SurveySelectors.isSurvey));

        isSurvey.isAsutp = value.isAsutp;
        if (value.isAsutp && value.significanceLevel) {
          isSurvey.classAsutp = this.defineProtectionClass();
        } else {
          isSurvey.classAsutp = null;
        }

        this.store.dispatch(new UpdateSurvey(isSurvey));
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  private defineProtectionClass(): ProtectionClass {
    const formValue = this.surveyForm.value;

    switch (formValue.significanceLevel) {
      case DataSignificanceLevel.UZn1:
        return ProtectionClass.K1;
      case DataSignificanceLevel.UZn2:
        return ProtectionClass.K2;
      case DataSignificanceLevel.UZn3:
        return ProtectionClass.K3;
      default:
        return ProtectionClass.K3;
    }
  }

}
