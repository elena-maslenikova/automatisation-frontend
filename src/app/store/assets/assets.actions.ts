export class GetAssetTypes {
  static readonly type = '[Assets] Get Asset types';
}

export class UpdateSelectedAssetTypes {
  static readonly type = '[Survey] Update Selected Asset types';

  constructor(public payload: number[]) { };
}

export class GetAssets {
  static readonly type = '[Assets] Get assets';

  constructor(public payload?: { asset_type__in?: string, page?: 'next' | 'previous' }) { };
}

export class GetSelectedAssets {
  static readonly type = '[Survey] Get Selected Assets';
}

export class UpdateSelectedAssets {
  static readonly type = '[Survey] Update Selected Assets';

  constructor(public payload: number[]) { };
}