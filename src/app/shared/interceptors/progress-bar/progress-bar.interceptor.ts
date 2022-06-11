import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { DecreaseRequestCount, IncreaseRequestCount } from '@shared/store/progress-bar';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new IncreaseRequestCount());

    return next.handle(request).pipe(
      finalize(() => this.store.dispatch(new DecreaseRequestCount()))
    );
  }
}
