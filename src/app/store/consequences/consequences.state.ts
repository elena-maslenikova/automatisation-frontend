import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsutpClass, Consequence, GisClass, IspdnClass, KiiClass } from '@app/models';
import { ConsequencesService } from '@app/services/consequences.service';
import { Action, State, StateContext } from '@ngxs/store';
import { PaginatedResponse } from '@shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConsequencesStateModel } from './consequences-state.model';
import {
  GetAsutpConsequences, GetConsequences, GetGisConsequences,
  GetIspdnConsequences, GetKiiConsequences, UpdateSelectedConsequences,
} from './consequences.actions';

const defaults: ConsequencesStateModel = {
  consequenceList: null,
  selectedConsequencesIds: null,
  ispdnConsequencesIds: null,
  gisConsequencesIds: null,
  asutpConsequencesIds: null,
  kiiConsequencesIds: null
};

@State<ConsequencesStateModel>({
  name: 'consequences',
  defaults,
})
@Injectable()
export class ConsequencesState {

  constructor(
    private consequencesService: ConsequencesService
  ) { }

  @Action(GetConsequences)
  getConsequences(
    ctx: StateContext<ConsequencesStateModel>,
  ): Observable<PaginatedResponse<Consequence>> {
    return this.consequencesService.getConsequences()
      .pipe(
        tap((result: PaginatedResponse<Consequence>) => {
          ctx.patchState({ consequenceList: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetIspdnConsequences)
  getIspdnConsequences(
    ctx: StateContext<ConsequencesStateModel>,
    { payload }: GetIspdnConsequences
  ): Observable<PaginatedResponse<IspdnClass>> {
    return this.consequencesService.getIspdnConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<IspdnClass>) => {
          ctx.patchState({ ispdnConsequencesIds: result.results.map(item => item.id) });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetGisConsequences)
  getGisConsequences(
    ctx: StateContext<ConsequencesStateModel>,
    { payload }: GetGisConsequences
  ): Observable<PaginatedResponse<GisClass>> {
    return this.consequencesService.getGisConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<GisClass>) => {
          ctx.patchState({ gisConsequencesIds: result.results.map(item => item.id) });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetAsutpConsequences)
  getAsutpConsequences(
    ctx: StateContext<ConsequencesStateModel>,
    { payload }: GetAsutpConsequences
  ): Observable<PaginatedResponse<AsutpClass>> {
    return this.consequencesService.getAsutpConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<AsutpClass>) => {
          ctx.patchState({ asutpConsequencesIds: result.results.map(item => item.id) });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetKiiConsequences)
  getKiiConsequences(
    ctx: StateContext<ConsequencesStateModel>,
    { payload }: GetKiiConsequences
  ): Observable<PaginatedResponse<KiiClass>> {
    return this.consequencesService.getKiiConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<KiiClass>) => {
          ctx.patchState({ kiiConsequencesIds: result.results.map(item => item.id) });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(UpdateSelectedConsequences)
  updateSelectedConsequences(
    ctx: StateContext<ConsequencesStateModel>,
    { payload }: UpdateSelectedConsequences
  ): ConsequencesStateModel {
    return ctx.patchState({ selectedConsequencesIds: payload });
  }
}
