import { IsSurvey } from '@app/models';
import { Selector } from '@ngxs/store';
import { SurveyStateModel } from './survey-state.model';
import { SurveyState } from './survey.state';

export class SurveySelectors {
  @Selector([SurveyState])
  public static isSurvey(state: SurveyStateModel): IsSurvey {
    return state.isSurvey;
  }

  @Selector([SurveyState])
  public static pdnTypes(state: SurveyStateModel): string[] {
    return state.pdnTypes;
  }

  @Selector([SurveyState])
  public static gisSize(state: SurveyStateModel): string {
    return state.gisSize;
  }

  @Selector([SurveyState])
  public static kiiSpecification(state: SurveyStateModel): string[] {
    return state.kiiSpecification;
  }
}
