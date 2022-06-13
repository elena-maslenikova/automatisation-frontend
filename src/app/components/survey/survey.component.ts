import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { GisSizes } from '@app/constants';
import { KiiSpecifications } from '@app/constants/kii-specification.const';
import { AssetType, CommonSurvey, IsIspdnSurvey, IsSurvey } from '@app/models';
import { AssetsSelectors, GetAssetTypes, UpdateSelectedAssetTypes } from '@app/store/assets';
import { SurveySelectors, UpdateGisSize, UpdateKiiSpecification } from '@app/store/survey';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @Select(SurveySelectors.isSurvey) isSurvey$: Observable<IsSurvey>;
  @Select(SurveySelectors.gisSize) gisSize$: Observable<string>;
  @Select(SurveySelectors.kiiSpecification) kiiSpecification$: Observable<string[]>;
  @Select(AssetsSelectors.assetTypes) assetTypes$: Observable<AssetType[]>;
  @Select(AssetsSelectors.selectedAssetTypesIds) selectedAssetTypesIds$: Observable<number[]>;

  isFirstStepValid: boolean = false;
  ispdnSurveyResult!: IsIspdnSurvey;
  commonSurveyResult!: CommonSurvey;

  gisSizes = GisSizes;
  kiiSpecifications = KiiSpecifications;

  kiiSpecification: string[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetAssetTypes());

    this.subscriptions.add(
      this.kiiSpecification$.subscribe((kiiSpecification) => {
        if (!kiiSpecification) return;
        this.kiiSpecification = kiiSpecification;
      })
    );
  }

  kiiSpecificationChange(event: MatCheckboxChange) {
    if (event.checked) {
      const newSpecification = [...this.kiiSpecification];
      newSpecification.push(event.source.value)
      this.kiiSpecification = newSpecification;
    } else {
      const index = this.kiiSpecification.indexOf(event.source.value);
      if (index !== -1) {
        const newSpecification = [...this.kiiSpecification];
        newSpecification.splice(index, 1);
        this.kiiSpecification = newSpecification;
      }
    }
    this.store.dispatch(new UpdateKiiSpecification(this.kiiSpecification));
  }

  assetTypesChange(event: MatCheckboxChange) {
    const currentAssetTypesIds = this.store.selectSnapshot(AssetsSelectors.selectedAssetTypesIds);
    const assetTypesIds = currentAssetTypesIds ? [...currentAssetTypesIds] : [];
    if (event.checked) {
      assetTypesIds.push(+event.source.value)
    } else {
      const index = assetTypesIds.indexOf(+event.source.value);
      if (index !== -1) {
        assetTypesIds.splice(index, 1);
      }
    }
    this.store.dispatch(new UpdateSelectedAssetTypes(assetTypesIds));
  }

  updateGisSize(event: MatRadioChange) {
    this.store.dispatch(new UpdateGisSize(event.value));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
