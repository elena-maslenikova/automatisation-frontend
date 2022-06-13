import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'Basic YWRtaW46UUlXakk3';

    request = request.clone({
      setHeaders: {
        Authorization: token
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpResponse<any>) => {
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
