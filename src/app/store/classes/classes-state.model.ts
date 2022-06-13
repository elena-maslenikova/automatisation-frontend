import { AsutpClass, GisClass, IspdnClass, KiiClass } from "@app/models";

export interface ClassesStateModel {
  ispdnClasses: IspdnClass[];
  ispdnConsequencesClasses: IspdnClass[];
  gisClasses: GisClass[];
  gisConsequencesClasses: GisClass[];
  asutpClasses: AsutpClass[];
  asutpConsequencesClasses: AsutpClass[];
  kiiClasses: KiiClass[];
  kiiConsequencesClasses: KiiClass[];
}
