import { Component } from '@angular/core';
import { IsSurvey } from '@app/models';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  isFirstStepValid: boolean = false;
  isSurveyResult!: IsSurvey;
}
