import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from '@shared/services/progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(private progressBarService: ProgressBarService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.increaseRequestCount();

    return next.handle(request).pipe(
      finalize(() => this.progressBarService.decreaseRequestCount())
    );
  }
}
