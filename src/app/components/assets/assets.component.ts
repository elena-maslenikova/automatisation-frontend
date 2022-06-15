import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Asset } from '@app/models';
import { AssetsSelectors, GetAssets, UpdateSelectedAssets } from '@app/store/assets';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  @Select(AssetsSelectors.selectedAssetTypesIds) selectedAssetTypesIds$: Observable<number[]>;
  @Select(AssetsSelectors.assets) assets$: Observable<Asset[]>;
  @Select(AssetsSelectors.assetsCount) assetsCount$: Observable<number>;
  @Select(AssetsSelectors.selectedAssetsIds) selectedAssetsIds$: Observable<number[]>;

  selectedAssets: Asset[];
  displayedColumns: string[] = [
    'name',
    'typeName',
    'delete',
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.selectedAssetTypesIds$.subscribe((types) => {
        if (!types?.length) { return; }

        this.store.dispatch(new GetAssets({ asset_type__in: types.toString() }));
      })
    );

    combineLatest([this.assets$, this.selectedAssetsIds$]).subscribe(([assets, ids]) => {
      this.selectedAssets = assets?.filter(asset => ids?.includes(asset.id));
    })
  }

  getPage(event: PageEvent) {
    const page: 'next' | 'previous' = event.pageIndex - event.previousPageIndex > 0 ? 'next' : 'previous';
    const assetTypes = this.store.selectSnapshot(AssetsSelectors.selectedAssetTypesIds);

    this.store.dispatch(new GetAssets({ asset_type__in: assetTypes.toString(), page }));
  }

  deleteAsset(id: number) {
    const selectedAssetsIds = this.store.selectSnapshot(AssetsSelectors.selectedAssetsIds) ?
      [...this.store.selectSnapshot(AssetsSelectors.selectedAssetsIds)] : [];

    const index = selectedAssetsIds.findIndex(assetId => assetId === id);
    if (index !== -1) {
      selectedAssetsIds.splice(index, 1);
      this.store.dispatch(new UpdateSelectedAssets(selectedAssetsIds));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
