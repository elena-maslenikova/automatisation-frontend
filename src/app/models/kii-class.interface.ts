export interface KiiClass {
  id: number;
  specification: string;
  significance_attribute: string;
}

export interface KiiClassRequest {
  specification__in?: string;
  significance_attribute?: string;
}