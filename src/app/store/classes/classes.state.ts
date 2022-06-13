import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetType, AsutpClass, GisClass, IspdnClass, KiiClass } from '@app/models';
import { ClassesService } from '@app/services/classes.service';
import { Action, State, StateContext } from '@ngxs/store';
import { PaginatedResponse } from '@shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ClassesStateModel } from './classes-state.model';
import {
  GetAsutpClasses, GetAsutpConsequencesClasses, GetGisClasses, GetGisConsequencesClasses,
  GetIspdnClasses, GetIspdnConsequencesClasses, GetKiiClasses, GetKiiConsequencesClasses,
} from './classes.actions';

const defaults: ClassesStateModel = {
  ispdnClasses: null,
  ispdnConsequencesClasses: null,
  gisClasses: null,
  gisConsequencesClasses: null,
  asutpClasses: null,
  asutpConsequencesClasses: null,
  kiiClasses: null,
  kiiConsequencesClasses: null
};

@State<ClassesStateModel>({
  name: 'classes',
  defaults,
})
@Injectable()
export class ClassesState {

  constructor(
    private classesService: ClassesService
  ) { }

  @Action(GetIspdnClasses)
  getIspdnClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetIspdnClasses
  ): Observable<PaginatedResponse<IspdnClass>> {
    return this.classesService.getClassesIspdn(payload)
      .pipe(
        tap((result: PaginatedResponse<IspdnClass>) => {
          ctx.patchState({ ispdnClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetIspdnConsequencesClasses)
  getIspdnConsequencesClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetIspdnConsequencesClasses
  ): Observable<PaginatedResponse<IspdnClass>> {
    return this.classesService.getIspdnConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<IspdnClass>) => {
          ctx.patchState({ ispdnConsequencesClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetGisClasses)
  getGisClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetGisClasses
  ): Observable<PaginatedResponse<GisClass>> {
    return this.classesService.getClassesGis(payload)
      .pipe(
        tap((result: PaginatedResponse<GisClass>) => {
          ctx.patchState({ gisClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetGisConsequencesClasses)
  getGisConsequencesClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetGisConsequencesClasses
  ): Observable<PaginatedResponse<GisClass>> {
    return this.classesService.getGisConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<GisClass>) => {
          ctx.patchState({ gisConsequencesClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetAsutpClasses)
  getAsutpClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetAsutpClasses
  ): Observable<PaginatedResponse<AsutpClass>> {
    return this.classesService.getClassesAsutp(payload)
      .pipe(
        tap((result: PaginatedResponse<AsutpClass>) => {
          ctx.patchState({ asutpClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetAsutpConsequencesClasses)
  getAsutpConsequencesClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetAsutpConsequencesClasses
  ): Observable<PaginatedResponse<AsutpClass>> {
    return this.classesService.getAsutpConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<AsutpClass>) => {
          ctx.patchState({ asutpConsequencesClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetKiiClasses)
  getKiiClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetKiiClasses
  ): Observable<PaginatedResponse<KiiClass>> {
    return this.classesService.getClassesKii(payload)
      .pipe(
        tap((result: PaginatedResponse<KiiClass>) => {
          ctx.patchState({ kiiClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }

  @Action(GetKiiConsequencesClasses)
  getKiiConsequencesClasses(
    ctx: StateContext<ClassesStateModel>,
    { payload }: GetKiiConsequencesClasses
  ): Observable<PaginatedResponse<KiiClass>> {
    return this.classesService.getKiiConsequences(payload)
      .pipe(
        tap((result: PaginatedResponse<KiiClass>) => {
          ctx.patchState({ kiiConsequencesClasses: result.results });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }
}
