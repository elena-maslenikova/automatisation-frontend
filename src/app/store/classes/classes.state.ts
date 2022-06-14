import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsutpClass, GisClass, IspdnClass, KiiClass } from '@app/models';
import { ClassesService } from '@app/services/classes.service';
import { Action, State, StateContext } from '@ngxs/store';
import { PaginatedResponse } from '@shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ClassesStateModel } from './classes-state.model';
import { GetAsutpClasses, GetGisClasses, GetIspdnClasses, GetKiiClasses } from './classes.actions';

const defaults: ClassesStateModel = {
  ispdnClasses: null,
  gisClasses: null,
  asutpClasses: null,
  kiiClasses: null,
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
          ctx.patchState({ ispdnClasses: result.results.map(item => item.id) });
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
          ctx.patchState({ gisClasses: result.results.map(item => item.id) });
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
          ctx.patchState({ asutpClasses: result.results.map(item => item.id) });
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
          ctx.patchState({ kiiClasses: result.results.map(item => item.id) });
        }),
        catchError((err: HttpErrorResponse) => {
          // this.store.dispatch(new SetSnackBarMessage(err.error?.text || "Creating key failed"));
          return throwError(() => new Error(err.error));
        })
      )
  }
}
