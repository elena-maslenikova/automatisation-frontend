import { Consequence } from "@app/models";

export interface ConsequencesStateModel {
  consequenceList: Consequence[];
  selectedConsequencesIds: number[];
  ispdnConsequencesIds: number[];
  gisConsequencesIds: number[];
  asutpConsequencesIds: number[];
  kiiConsequencesIds: number[];
}
