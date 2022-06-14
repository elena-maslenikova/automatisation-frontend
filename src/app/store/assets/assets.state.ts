import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset, AssetType } from '@app/models';
import { AssetsService } from '@app/services/assets.service';
import { Action, State, StateContext } from '@ngxs/store';
import { PaginatedResponse } from '@shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AssetsStateModel } from './assets-state.model';
import {
  GetAssets, GetAssetTypes, UpdateSelectedAssets, UpdateSelectedAssetTypes
} from './assets.actions';

const defaults: AssetsStateModel = {
  assets: null,
  selectedAssetsIds: null,
  assetTypes: null,
  selectedAssetTypesIds: null
};

@State<AssetsStateModel>({
  name: 'assets',
  defaults,
})
@Injectable()
export class AssetsState {

  constructor(
    private assetsService: AssetsService
  ) { }

  @Action(GetAssetTypes)
  getAssetTypes(
    ctx: StateContext<AssetsStateModel>,
  ): Observable<PaginatedResponse<AssetType>> {
    return this.assetsService.getAssetTypes()
      .pipe(
        tap((result: PaginatedResponse<AssetType>) => {
          ctx.patchState({ assetTypes: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(UpdateSelectedAssetTypes)
  updateSelectedAssetTypes(
    ctx: StateContext<AssetsStateModel>,
    { payload }: UpdateSelectedAssetTypes
  ): AssetsStateModel {
    return ctx.patchState({ selectedAssetTypesIds: payload });
  }

  @Action(GetAssets)
  getAssets(
    ctx: StateContext<AssetsStateModel>,
    { payload }: GetAssets,
  ): Observable<PaginatedResponse<Asset>> {
    const state = ctx.getState();
    const requestUrl = payload?.page === 'next' ? state?.assets?.next :
      payload?.page === 'previous' ? state?.assets?.previous : null;

    return this.assetsService.getAssets(payload?.asset_type__in, requestUrl)
      .pipe(
        tap((result: PaginatedResponse<Asset>) => {
          ctx.patchState({ assets: result });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(UpdateSelectedAssets)
  updateSelectedAssets(
    ctx: StateContext<AssetsStateModel>,
    { payload }: UpdateSelectedAssets
  ): AssetsStateModel {
    return ctx.patchState({ selectedAssetsIds: payload });
  }
}
