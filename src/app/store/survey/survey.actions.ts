import { IsSurvey } from "@app/models";

export class UpdateSurvey {
  static readonly type = '[Survey] Update Survey';

  constructor(public payload: IsSurvey) {};
}

export class UpdatePdnTypes {
  static readonly type = '[Survey] Update Pdn types';

  constructor(public payload: string[]) {};
}

export class UpdateGisSize {
  static readonly type = '[Survey] Update Gis size';

  constructor(public payload: string) {};
}

export class UpdateKiiSpecification {
  static readonly type = '[Survey] Update Kii specification';

  constructor(public payload: string[]) {};
}
