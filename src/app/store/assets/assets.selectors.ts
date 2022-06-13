import { Asset, AssetType } from '@app/models';
import { Selector } from '@ngxs/store';
import { AssetsStateModel } from './assets-state.model';
import { AssetsState } from './assets.state';

export class AssetsSelectors {
  @Selector([AssetsState])
  public static assetTypes(state: AssetsStateModel): AssetType[] {
    return state.assetTypes;
  }

  @Selector([AssetsState])
  public static selectedAssetTypesIds(state: AssetsStateModel): number[] {
    return state.selectedAssetTypesIds;
  }

  @Selector([AssetsState])
  public static assets(state: AssetsStateModel): Asset[] {
    return state.assets?.results;
  }
}
