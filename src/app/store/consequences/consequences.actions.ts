import {
  AsutpClassRequest, GisClassRequest, IspdnClassRequest, KiiClassRequest
} from "@app/models";

export class GetConsequences {
  static readonly type = '[Consequences] Get Consequences';
}

export class GetIspdnConsequences {
  static readonly type = '[Consequences] Get Ispdn Consequences';

  constructor(public payload: IspdnClassRequest) {};
}

export class GetGisConsequences {
  static readonly type = '[Consequences] Get Gis Consequences';

  constructor(public payload: GisClassRequest) {};
}

export class GetAsutpConsequences {
  static readonly type = '[Consequences] Get Asutp Consequences';

  constructor(public payload: AsutpClassRequest) {};
}

export class GetKiiConsequences {
  static readonly type = '[Consequences] Get Kii Consequences';

  constructor(public payload: KiiClassRequest) {};
}
