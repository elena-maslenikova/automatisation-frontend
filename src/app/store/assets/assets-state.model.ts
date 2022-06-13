import { Asset, AssetType } from "@app/models";
import { PaginatedResponse } from "@shared/models";

export interface AssetsStateModel {
  assets: PaginatedResponse<Asset>;
  selectedAssets: Asset[];
  assetTypes: AssetType[];
  selectedAssetTypesIds: number[];
}
