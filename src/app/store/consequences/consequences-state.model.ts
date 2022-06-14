import { Consequence } from "@app/models";

export interface ConsequencesStateModel {
  consequenceList: Consequence[];
  ispdnConsequencesIds: number[];
  gisConsequencesIds: number[];
  asutpConsequencesIds: number[];
  kiiConsequencesIds: number[];
}
