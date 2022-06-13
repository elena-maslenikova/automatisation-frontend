export class GetAssetTypes {
  static readonly type = '[Assets] Get Asset types';
}

export class UpdateSelectedAssetTypes {
  static readonly type = '[Survey] Update Selected Asset types';

  constructor(public payload: number[]) {};
}

export class GetAssets {
  static readonly type = '[Assets] Get assets';
}
