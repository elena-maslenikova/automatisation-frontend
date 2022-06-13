import { AsutpClass, GisClass, IspdnClass, KiiClass } from '@app/models';
import { Selector } from '@ngxs/store';
import { ClassesStateModel } from './classes-state.model';
import { ClassesState } from './classes.state';

export class ClassesSelectors {
  @Selector([ClassesState])
  public static ispdnClasses(state: ClassesStateModel): IspdnClass[] {
    return state.ispdnClasses;
  }

  @Selector([ClassesState])
  public static ispdnConsequencesClasses(state: ClassesStateModel): IspdnClass[] {
    return state.ispdnConsequencesClasses;
  }

  @Selector([ClassesState])
  public static gisClasses(state: ClassesStateModel): GisClass[] {
    return state.gisClasses;
  }

  @Selector([ClassesState])
  public static gisConsequencesClasses(state: ClassesStateModel): GisClass[] {
    return state.gisConsequencesClasses;
  }
  
  @Selector([ClassesState])
  public static asutpClasses(state: ClassesStateModel): AsutpClass[] {
    return state.asutpClasses;
  }

  @Selector([ClassesState])
  public static asutpConsequencesClasses(state: ClassesStateModel): AsutpClass[] {
    return state.asutpConsequencesClasses;
  }
  
  @Selector([ClassesState])
  public static kiiClasses(state: ClassesStateModel): KiiClass[] {
    return state.kiiClasses;
  }

  @Selector([ClassesState])
  public static kiiConsequencesClasses(state: ClassesStateModel): KiiClass[] {
    return state.kiiConsequencesClasses;
  }
}
