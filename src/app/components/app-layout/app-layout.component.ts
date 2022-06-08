import { Component } from '@angular/core';
import { ProgressBarService } from '@shared/services/progress-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  requestCount$: Observable<number> = this.progressBarService.requestCountChanged;
  isEditable = false;

  constructor(
    private progressBarService: ProgressBarService
  ) { }

}
