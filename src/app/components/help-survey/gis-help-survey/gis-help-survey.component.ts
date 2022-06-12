import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataSignificanceLevel, DataSignificanceLevels, GisSize, GisSizes, ProtectionClass } from '@app/constants';
import { IsSurvey } from '@app/models';
import { SurveySelectors, UpdateGisSize, UpdateSurvey } from '@app/store/survey';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-gis-help-survey',
  templateUrl: './gis-help-survey.component.html',
  styleUrls: ['./gis-help-survey.component.scss']
})
export class GisHelpSurveyComponent implements OnInit, OnDestroy {
  @Select(SurveySelectors.isSurvey) isSurvey$: Observable<IsSurvey>;
  @Select(SurveySelectors.gisSize) gisSize$: Observable<string>;

  surveyForm: FormGroup = this.formBuilder.group({
    isGis: new FormControl(),
    gisSize: new FormControl(),
    significanceLevel: new FormControl()
  });
  gisSizes = GisSizes;
  dataSignificanceLevels = DataSignificanceLevels;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.gisSize$.subscribe((size) => {
        this.surveyForm.patchValue(
          { gisSize: size },
          { emitEvent: false }
        );
      })
    );

    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        const isSurvey = Object.assign({}, this.store.selectSnapshot(SurveySelectors.isSurvey));

        isSurvey.isGis = value.isGis;
        if (value.isGis && value.gisSize && value.significanceLevel) {
          isSurvey.classGis = this.defineProtectionClass();
        } else {
          isSurvey.classGis = null;
        }

        if (value.gisSize) {
          this.store.dispatch(new UpdateGisSize(value.gisSize));
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
        switch (formValue.gisSize) {
          case GisSize.FEDERAL:
            return ProtectionClass.K1;
          default:
            return ProtectionClass.K2;
        }
      case DataSignificanceLevel.UZn3:
        switch (formValue.gisSize) {
          case GisSize.FEDERAL:
            return ProtectionClass.K2;
          default:
            return ProtectionClass.K3;
        }
      default:
        return ProtectionClass.K3;
    }
  }

}
