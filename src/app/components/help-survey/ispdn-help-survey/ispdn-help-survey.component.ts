import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IspdnType, IspdnTypes, ProtectionLevel } from '@app/constants';
import { IsSurvey } from '@app/models';
import { SurveySelectors, UpdatePdnTypes, UpdateSurvey } from '@app/store/survey';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ispdn-help-survey',
  templateUrl: './ispdn-help-survey.component.html',
  styleUrls: ['./ispdn-help-survey.component.scss']
})
export class IspdnHelpSurveyComponent implements OnInit, OnDestroy {
  @Select(SurveySelectors.isSurvey) isSurvey$: Observable<IsSurvey>;
  @Select(SurveySelectors.pdnTypes) pdnTypes$: Observable<string[]>;

  surveyForm: FormGroup = this.formBuilder.group({
    isIspdn: new FormControl(),
    pdnTypes: this.formBuilder.array([]),
    po: new FormControl(),
    trustPo: new FormControl(false),
    systemPo: new FormControl(),
    trustSystemPo: new FormControl(false),
    biometricClientPdn: new FormControl(),
    lotsBiometricClientPdn: new FormControl(false),
    specialClientPdn: new FormControl(),
    lotsSpecialClientPdn: new FormControl(false),
    publicClientPdn: new FormControl(),
    lotsPublicClientPdn: new FormControl(false),
    otherClientPdn: new FormControl(),
    lotsOtherClientPdn: new FormControl(false)
  });
  actualThreatType: 1 | 2 | 3;
  ispdnTypes = IspdnTypes;
  ispdnType = IspdnType;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.pdnTypes$.subscribe((types) => {
        this.surveyForm.patchValue(
          { pdnTypes: types },
          { emitEvent: false }
        );
      })
    );

    this.subscriptions.add(
      this.surveyForm.valueChanges.subscribe((value) => {
        const isSurvey = Object.assign({}, this.store.selectSnapshot(SurveySelectors.isSurvey));
        isSurvey.isIspdn = value.isIspdn;
        this.actualThreatType = this.getActualThreatType();
        if (value.isIspdn && value.pdnTypes?.length) {
          isSurvey.classIspdn = this.defineProtectionLevel();
        }
        else {
          isSurvey.classIspdn = null;
        }

        this.store.dispatch(new UpdateSurvey(isSurvey));
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

  private getActualThreatType(): 1 | 2 | 3 {
    const formValue = this.surveyForm.value;

    if (formValue.systemPo === false && formValue.trustSystemPo === false) {
      return 1;
    }
    if (formValue.po === false && formValue.trustPo === false) {
      return 2;
    }
    return 3;
  }

  defineProtectionLevel(): ProtectionLevel {
    let level: ProtectionLevel = ProtectionLevel.UZ4;
    const formValue = this.surveyForm.value;
    if (formValue.pdnTypes.includes(this.ispdnType.SPECIAL)) {
      if (formValue.specialClientPdn && formValue.lotsSpecialClientPdn) {
        switch (this.actualThreatType) {
          case 1:
          case 2:
            level > ProtectionLevel.UZ1 ? level = ProtectionLevel.UZ1 : null;
            break;
          case 3:
            level > ProtectionLevel.UZ2 ? level = ProtectionLevel.UZ2 : null;
            break;
          default:
            break;
        };
      } else {
        switch (this.actualThreatType) {
          case 1:
            level > ProtectionLevel.UZ1 ? level = ProtectionLevel.UZ1 : null;
            break;
          case 2:
            level > ProtectionLevel.UZ2 ? level = ProtectionLevel.UZ2 : null;
            break;
          case 3:
            level > ProtectionLevel.UZ3 ? level = ProtectionLevel.UZ3 : null;
            break;
          default:
            break;
        }
      }
    }
    if (formValue.pdnTypes.includes(this.ispdnType.BIOMETRIC)) {
      switch (this.actualThreatType) {
        case 1:
          level > ProtectionLevel.UZ1 ? level = ProtectionLevel.UZ1 : null;
          break;
        case 2:
          level > ProtectionLevel.UZ2 ? level = ProtectionLevel.UZ2 : null;
          break;
        case 3:
          level > ProtectionLevel.UZ3 ? level = ProtectionLevel.UZ3 : null;
          break;
        default:
          break;
      }
    }
    if (formValue.pdnTypes.includes(this.ispdnType.OTHER)) {
      if (formValue.otherClientPdn && formValue.lotsOtherClientPdn) {

        switch (this.actualThreatType) {
          case 1:
            level > ProtectionLevel.UZ1 ? level = ProtectionLevel.UZ1 : null;
            break;
          case 2:
            level > ProtectionLevel.UZ2 ? level = ProtectionLevel.UZ2 : null;
            break;
          case 3:
            level > ProtectionLevel.UZ3 ? level = ProtectionLevel.UZ3 : null;
            break;
          default:
            break;
        };
      } else {
        switch (this.actualThreatType) {
          case 1:
            level > ProtectionLevel.UZ1 ? level = ProtectionLevel.UZ1 : null;
            break;
          case 2:
            level > ProtectionLevel.UZ3 ? level = ProtectionLevel.UZ3 : null;
            break;
          case 3:
            level > ProtectionLevel.UZ4 ? level = ProtectionLevel.UZ4 : null;
            break;
          default:
            break;
        }
      }
    }
    if (formValue.pdnTypes.includes(this.ispdnType.PUBLIC)) {
      if (formValue.publicClientPdn && formValue.lotsPublicClientPdn) {
        switch (this.actualThreatType) {
          case 1:
          case 2:
            level > ProtectionLevel.UZ2 ? level = ProtectionLevel.UZ2 : null;
            break;
          case 3:
            level > ProtectionLevel.UZ4 ? level = ProtectionLevel.UZ4 : null;
            break;
          default:
            break;
        }
      } else {
        switch (this.actualThreatType) {
          case 1:
            level > ProtectionLevel.UZ2 ? level = ProtectionLevel.UZ2 : null;
            break;
          case 2:
            level > ProtectionLevel.UZ3 ? level = ProtectionLevel.UZ3 : null;
            break;
          case 3:
            level > ProtectionLevel.UZ4 ? level = ProtectionLevel.UZ4 : null;
            break;
          default:
            break;
        }
      }
    }

    return level;
  }

}
