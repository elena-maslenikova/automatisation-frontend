import { Asset, AssetType } from "@app/models";
import { PaginatedResponse } from "@shared/models";

export interface AssetsStateModel {
  assets: PaginatedResponse<Asset>;
  selectedAssetsIds: number[];
  assetTypes: AssetType[];
  selectedAssetTypesIds: number[];
}
