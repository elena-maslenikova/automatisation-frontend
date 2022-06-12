import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SurveyStateModel } from './survey-state.model';
import { UpdateGisSize, UpdateKiiSpecification, UpdatePdnTypes, UpdateSurvey } from './survey.actions';

const defaults: SurveyStateModel = {
  isSurvey: {
    isIspdn: null,
    isGis: null,
    isAsutp: null,
    isKii: null,
    classIspdn: null,
    classGis: null,
    classAsutp: null,
    classKii: null
  },
  pdnTypes: null,
  gisSize: null,
  kiiSpecification: null
};

@State<SurveyStateModel>({
  name: 'survey',
  defaults,
})
@Injectable()
export class SurveyState {
  @Action(UpdateSurvey)
  updateSurvey(
    ctx: StateContext<SurveyStateModel>,
    { payload }: UpdateSurvey
  ): SurveyStateModel {
    return ctx.patchState({ isSurvey: payload });
  }

  @Action(UpdatePdnTypes)
  updatePdnTypes(
    ctx: StateContext<SurveyStateModel>,
    { payload }: UpdatePdnTypes
  ): SurveyStateModel {
    return ctx.patchState({ pdnTypes: payload });
  }

  @Action(UpdateGisSize)
  updateGisSize(
    ctx: StateContext<SurveyStateModel>,
    { payload }: UpdateGisSize
  ): SurveyStateModel {
    return ctx.patchState({ gisSize: payload });
  }

  @Action(UpdateKiiSpecification)
  updateKiiSpecification(
    ctx: StateContext<SurveyStateModel>,
    { payload }: UpdateKiiSpecification
  ): SurveyStateModel {
    return ctx.patchState({ kiiSpecification: payload });
  }
}
