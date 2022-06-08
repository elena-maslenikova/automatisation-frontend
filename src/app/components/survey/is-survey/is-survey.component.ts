import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProtectionClasses, ProtectionLevels, SignificanceAttributes } from '@app/constants';
import { IsSurvey } from '@app/models';
import { atLeastOneValidator } from '@shared/validators/at-least-one.validator';
import { distinctUntilChanged, merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-is-survey',
  templateUrl: './is-survey.component.html',
  styleUrls: ['./is-survey.component.scss']
})
export class IsSurveyComponent implements OnInit, OnDestroy {
  @Output() validityChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() isSurveyResultChanged: EventEmitter<IsSurvey> = new EventEmitter();

  typeFormGroup: FormGroup = this.formBuilder.group({
    isIspdn: new FormControl(),
    isGis: new FormControl(),
    isAsutp: new FormControl(),
    isKii: new FormControl(),
  }, { validators: atLeastOneValidator() });
  classFormGroup: FormGroup = this.formBuilder.group({
    classIspdn: new FormControl(),
    classGis: new FormControl(),
    classAsutp: new FormControl(),
    classKii: new FormControl(),
  });
  isTypesSelected: boolean = false;

  protectionClasses = ProtectionClasses;
  protectionLevels = ProtectionLevels;
  significanceAttributes = SignificanceAttributes;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.typeFormGroup.valueChanges
        .pipe(
          distinctUntilChanged()
        )
        .subscribe((value) => {
          this.isTypesSelected = value.isIspdn || value.isGis || value.isAsutp || value.isKii;
          this.validityChanged.emit(this.isTypesSelected);
        })
    );

    this.subscriptions.add(
      merge(
        this.typeFormGroup.valueChanges,
        this.classFormGroup.valueChanges
      )
        .pipe(
          distinctUntilChanged()
        )
        .subscribe(() => this.isSurveyResultChanged.emit(this.updateSurvey()))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateSurvey(): IsSurvey {
    const types = this.typeFormGroup.value;
    const classes = this.classFormGroup.value;

    const surveyResult: IsSurvey = {
      isIspdn: types.isIspdn,
      isGis: types.isGis,
      isAsutp: types.isAsutp,
      isKii: types.isKii,
      classIspdn: classes.classIspdn,
      classGis: classes.classGis,
      classAsutp: classes.classAsutp,
      classKii: classes.classKii
    };
    return surveyResult;
  }

}
