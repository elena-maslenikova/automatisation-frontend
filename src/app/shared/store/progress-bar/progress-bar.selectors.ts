import { Selector } from '@ngxs/store';
import { ProgressBarStateModel } from './progress-bar-state.model';
import { ProgressBarState } from './progress-bar.state';

export class ProgressBarSelectors {
  @Selector([ProgressBarState])
  public static requestCount(state: ProgressBarStateModel): number {
    return state.requestCount;
  }
}
