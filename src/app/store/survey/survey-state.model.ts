import { IsSurvey } from "@app/models";

export interface SurveyStateModel {
  isSurvey: IsSurvey;
  pdnTypes: string[];
  gisSize: string;
  kiiSpecification: string[];
}
