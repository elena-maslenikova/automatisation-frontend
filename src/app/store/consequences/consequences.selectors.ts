import { Consequence } from '@app/models';
import { Selector } from '@ngxs/store';
import { ConsequencesStateModel } from './consequences-state.model';
import { ConsequencesState } from './consequences.state';

export class ConsequencesSelectors {
  @Selector([ConsequencesState])
  public static consequenceList(state: ConsequencesStateModel): Consequence[] {
    return state.consequenceList;
  }

  @Selector([ConsequencesState])
  public static selectedConsequencesIds(state: ConsequencesStateModel): number[] {
    return state.selectedConsequencesIds;
  }

  @Selector([ConsequencesState])
  public static ispdnConsequencesIds(state: ConsequencesStateModel): number[] {
    return state.ispdnConsequencesIds;
  }

  @Selector([ConsequencesState])
  public static gisConsequencesIds(state: ConsequencesStateModel): number[] {
    return state.gisConsequencesIds;
  }

  @Selector([ConsequencesState])
  public static asutpConsequencesIds(state: ConsequencesStateModel): number[] {
    return state.asutpConsequencesIds;
  }

  @Selector([ConsequencesState])
  public static kiiConsequencesIds(state: ConsequencesStateModel): number[] {
    return state.kiiConsequencesIds;
  }
}
