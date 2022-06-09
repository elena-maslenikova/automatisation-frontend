import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GisSizes } from '@app/constants';
import { KiiSpecifications } from '@app/constants/kii-specification.const';
import { IsIspdnSurvey, IsSurvey } from '@app/models';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  isFirstStepValid: boolean = false;
  isSurveyResult!: IsSurvey;
  ispdnSurveyResult!: IsIspdnSurvey;

  gisSizes = GisSizes;
  kiiSpecifications = KiiSpecifications;

  gisSize!: string;
  kiiSpecification: string[] = [];

  onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      if (event.source.value !== 'unnessasary') {
        this.kiiSpecification.push(event.source.value);
      }
    } else {
      const index = this.kiiSpecification.indexOf(event.source.value);
      if (index !== -1) {
        this.kiiSpecification.splice(index, 1);
      }
    }
  }
}
