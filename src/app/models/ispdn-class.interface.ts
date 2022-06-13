export interface IspdnClass {
  id: number;
  type: string;
  specification: string;
  protection_level: string;
}

export interface IspdnClassRequest {
  type__in?: string;
  specification__in?: string;
  protection_level?: string;
}