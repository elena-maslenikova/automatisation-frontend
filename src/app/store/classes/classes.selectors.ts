import { Selector } from '@ngxs/store';
import { ClassesStateModel } from './classes-state.model';
import { ClassesState } from './classes.state';

export class ClassesSelectors {
  @Selector([ClassesState])
  public static ispdnClasses(state: ClassesStateModel): number[] {
    return state.ispdnClasses;
  }

  @Selector([ClassesState])
  public static gisClasses(state: ClassesStateModel): number[] {
    return state.gisClasses;
  }

  @Selector([ClassesState])
  public static asutpClasses(state: ClassesStateModel): number[] {
    return state.asutpClasses;
  }

  @Selector([ClassesState])
  public static kiiClasses(state: ClassesStateModel): number[] {
    return state.kiiClasses;
  }
}
