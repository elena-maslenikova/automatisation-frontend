import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SignificanceAttributes } from '@app/constants';
import { KiiSpecifications } from '@app/constants/kii-specification.const';
import { IsSurvey } from '@app/models';
import { SurveySelectors, UpdateKiiSpecification, UpdateSurvey } from '@app/store/survey';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-kii-help-survey',
  templateUrl: './kii-help-survey.component.html',
  styleUrls: ['./kii-help-survey.component.scss']
})
export class KiiHelpSurveyComponent implements OnInit, OnDestroy {
  @Select(SurveySelectors.isSurvey) isSurvey$: Observable<IsSurvey>;
  @Select(SurveySelectors.kiiSpecification) kiiSpecification$: Observable<string[]>;

  surveyForm: FormGroup = this.formBuilder.group({
    isKii: new FormControl(),
    kiiSpecification: new FormControl(),
    classKii: new FormControl(),
  });
  kiiSpecifications = KiiSpecifications;
  significanceAttributes = SignificanceAttributes;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.kiiSpecification$.subscribe((specification) => {
        this.surveyForm.patchValue(
          { kiiSpecification: specification },
          { emitEvent: false }
        );
      })
    );

    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        const isSurvey = Object.assign({}, this.store.selectSnapshot(SurveySelectors.isSurvey));

        isSurvey.isKii = value.isKii;
        if (!value.isKii) {
          isSurvey.classKii = null;
        } else {
          isSurvey.classKii = value.classKii;
        }

        this.store.dispatch([
          new UpdateSurvey(isSurvey),
          new UpdateKiiSpecification(value.kiiSpecification)
        ]);
      })
    );
  }

  kiiSpecificationChange(event: MatCheckboxChange) {
    if (event.checked) {
      const newSpecification = this.surveyForm.get('kiiSpecification')?.value ?
        [...this.surveyForm.get('kiiSpecification')?.value, event.source.value] : [event.source.value];
      this.surveyForm.get('kiiSpecification').setValue(newSpecification);
    } else {
      const index = this.surveyForm.get('kiiSpecification')?.value?.indexOf(event.source.value);
      if (index !== -1) {
        const newSpecification = [...this.surveyForm.get('kiiSpecification')?.value];
        newSpecification.splice(index, 1);
        this.surveyForm.get('kiiSpecification').setValue(newSpecification);
      }
    }
    this.store.dispatch(new UpdateKiiSpecification(this.surveyForm.get('kiiSpecification')?.value));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
