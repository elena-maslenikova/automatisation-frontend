import {
  AsutpClassRequest, GisClassRequest, IspdnClassRequest, KiiClassRequest
} from "@app/models";

export class GetIspdnClasses {
  static readonly type = '[Classes] Get Ispdn classes';

  constructor(public payload: IspdnClassRequest) {};
}

export class GetGisClasses {
  static readonly type = '[Classes] Get Gis classes';

  constructor(public payload: GisClassRequest) {};
}

export class GetAsutpClasses {
  static readonly type = '[Classes] Get Asutp classes';

  constructor(public payload: AsutpClassRequest) {};
}

export class GetKiiClasses {
  static readonly type = '[Classes] Get Kii classes';

  constructor(public payload: KiiClassRequest) {};
}
