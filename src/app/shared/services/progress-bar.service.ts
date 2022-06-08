import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  requestCount = 0;
  requestCountChanged: BehaviorSubject<number> = new BehaviorSubject(0);

  increaseRequestCount(): void {
    this.requestCountChanged.next(++this.requestCount);
  }

  decreaseRequestCount(): void {
    this.requestCountChanged.next(--this.requestCount);
  }
}
