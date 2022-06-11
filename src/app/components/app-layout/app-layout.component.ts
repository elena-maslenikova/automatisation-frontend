import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProgressBarSelectors } from '@shared/store/progress-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  @Select(ProgressBarSelectors.requestCount) requestCount$!: Observable<number>;
  isEditable = false;
}
