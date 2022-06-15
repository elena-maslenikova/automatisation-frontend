import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Asset } from '@app/models';
import { AssetsSelectors, GetAssets, UpdateSelectedAssets } from '@app/store/assets';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  @Select(AssetsSelectors.selectedAssetTypesIds) selectedAssetTypesIds$: Observable<number[]>;
  @Select(AssetsSelectors.assets) assets$: Observable<Asset[]>;
  @Select(AssetsSelectors.assetsCount) assetsCount$: Observable<number>;

  displayedColumns: string[] = [
    'select',
    'name',
    'typeName',
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
  }

  getPage(event: PageEvent) {
    const page: 'next' | 'previous' = event.pageIndex - event.previousPageIndex > 0 ? 'next' : 'previous';
    const assetTypes = this.store.selectSnapshot(AssetsSelectors.selectedAssetTypesIds);

    this.store.dispatch(new GetAssets({ asset_type__in: assetTypes.toString(), page }));
  }

  isSelected(id: number): boolean {
    const selectedAssets = this.store.selectSnapshot(AssetsSelectors.selectedAssetsIds);
    return !!selectedAssets?.find(item => item === id);
  }

  toggle(asset: Asset): void {
    const selectedAssets = this.store.selectSnapshot(AssetsSelectors.selectedAssetsIds) ?
      [...this.store.selectSnapshot(AssetsSelectors.selectedAssetsIds)] : [];
    const index = selectedAssets.findIndex(item => item === asset.id);
    if (index !== -1) {
      selectedAssets.splice(index, 1);
    } else {
      selectedAssets.push(asset.id);
    }

    this.store.dispatch(new UpdateSelectedAssets(selectedAssets));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
