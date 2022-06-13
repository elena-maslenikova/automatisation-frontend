import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { GisSizes, Specifications } from '@app/constants';
import { KiiSpecifications } from '@app/constants/kii-specification.const';
import {
  AssetType, AsutpClassRequest, CommonSurvey, GisClassRequest,
  IsIspdnSurvey, IspdnClassRequest, IsSurvey, KiiClassRequest
} from '@app/models';
import { AssetsSelectors, GetAssetTypes, UpdateSelectedAssetTypes } from '@app/store/assets';
import {
  GetAsutpClasses, GetAsutpConsequencesClasses, GetGisClasses, GetGisConsequencesClasses,
  GetIspdnClasses, GetIspdnConsequencesClasses, GetKiiClasses, GetKiiConsequencesClasses
} from '@app/store/classes';
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
    private store: Store,
    private router: Router
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

  getIsClasses() {
    const isSurvey = this.store.selectSnapshot(SurveySelectors.isSurvey);

    if (isSurvey.isIspdn) {
      this.getIspdnClasses();
    }
    if (isSurvey.isGis) {
      this.getGisClasses();
    }
    if (isSurvey.isAsutp) {
      this.getAsutpClasses();
    }
    if (isSurvey.isKii) {
      this.getKiiClasses();
    }

    // this.router.navigate(['/consequences']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getCommonSpecifications(): string[] {
    const specifications: string[] = [];
    if (!this.commonSurveyResult) { return specifications; }
    if (this.commonSurveyResult.government) {
      specifications.push(Specifications.GOVERNMENT);
    }
    if (this.commonSurveyResult.webResources) {
      specifications.push(Specifications.HAS_PRIVATE_WEB_RESOURCES);
    }
    if (this.commonSurveyResult.publicWebResources) {
      specifications.push(Specifications.HAS_PUBLIC_WEB_RESOURCES);
    }
    if (this.commonSurveyResult.publicPerception) {
      specifications.push(Specifications.IMPACT_ON_PUBLIC_PERCEPTION);
    }
    return specifications;
  }

  private getIspdnClasses(): void {
    const isSurvey = this.store.selectSnapshot(SurveySelectors.isSurvey);
    const params: IspdnClassRequest = {};

    const pdnTypes = this.store.selectSnapshot(SurveySelectors.pdnTypes);
    pdnTypes ? params.type__in = pdnTypes.toString() : null;

    const specifications = this.getCommonSpecifications();
    if (this.ispdnSurveyResult.accounting) {
      specifications.push(Specifications.FINANCIAL);
    }
    if (this.ispdnSurveyResult.governmentPdn) {
      specifications.push(Specifications.SPECIAL_OR_BIOMETRIC_OFFICIALS_PERSONAL_DATA);
    }
    if (!specifications.length) {
      specifications.push(Specifications.BASIC);
    }
    params.specification__in = specifications.toString();

    isSurvey.classIspdn ? params.protection_level = isSurvey.classIspdn : null;

    this.store.dispatch([
      new GetIspdnClasses(params),
      new GetIspdnConsequencesClasses(params),
    ]);
  }

  private getGisClasses(): void {
    const isSurvey = this.store.selectSnapshot(SurveySelectors.isSurvey);
    const params: GisClassRequest = {};

    isSurvey.classGis ? params.protection_class = isSurvey.classGis : null;

    const gisSize = this.store.selectSnapshot(SurveySelectors.gisSize);
    gisSize ? params.size = gisSize : null;

    const specifications = this.getCommonSpecifications().length ?
      this.getCommonSpecifications() : [Specifications.BASIC];
    params.specification__in = specifications.toString();

    this.store.dispatch([
      new GetGisClasses(params),
      new GetGisConsequencesClasses(params),
    ]);
  }

  private getAsutpClasses(): void {
    const isSurvey = this.store.selectSnapshot(SurveySelectors.isSurvey);
    const params: AsutpClassRequest = {};

    isSurvey.classAsutp ? params.protection_class = isSurvey.classAsutp : null;

    const specifications = this.getCommonSpecifications().length ?
      this.getCommonSpecifications() : [Specifications.BASIC];
    params.specification__in = specifications.toString();

    this.store.dispatch([
      new GetAsutpClasses(params),
      new GetAsutpConsequencesClasses(params),
    ]);
  }

  private getKiiClasses(): void {
    const isSurvey = this.store.selectSnapshot(SurveySelectors.isSurvey);
    const params: KiiClassRequest = {};

    isSurvey.classKii ? params.significance_attribute = isSurvey.classKii : null;

    const specifications = this.getCommonSpecifications();
    specifications.push(...this.kiiSpecification);
    if (!specifications.length) {
      specifications.push(Specifications.BASIC);
    }
    params.specification__in = specifications.toString();

    this.store.dispatch([
      new GetKiiClasses(params),
      new GetKiiConsequencesClasses(params),
    ]);
  }
}
