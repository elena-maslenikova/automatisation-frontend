import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetType } from '@app/models';
import { AssetsService } from '@app/services/assets.service';
import { Action, State, StateContext } from '@ngxs/store';
import { PaginatedResponse } from '@shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AssetsStateModel } from './assets-state.model';
import { GetAssetTypes, UpdateSelectedAssetTypes } from './assets.actions';

const defaults: AssetsStateModel = {
  assets: null,
  selectedAssets: null,
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
  ) {}

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
}
