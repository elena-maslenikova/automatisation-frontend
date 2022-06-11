import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ProgressBarStateModel } from './progress-bar-state.model';
import { IncreaseRequestCount, DecreaseRequestCount } from './progress-bar.actions';

const defaults: ProgressBarStateModel = {
  requestCount: 0,
};

@State<ProgressBarStateModel>({
  name: 'progressbar',
  defaults,
})
@Injectable()
export class ProgressBarState {
  @Action(IncreaseRequestCount)
  increaseRequestCount(ctx: StateContext<ProgressBarStateModel>): ProgressBarStateModel {
    const newRequestCount = ctx.getState().requestCount;
    return ctx.patchState({ requestCount: newRequestCount+1 });
  }

  @Action(DecreaseRequestCount)
  decreaseRequestCount(ctx: StateContext<ProgressBarStateModel>): ProgressBarStateModel {
    const newRequestCount = ctx.getState().requestCount;
    return ctx.patchState({ requestCount: newRequestCount-1 });
  }
}
