export interface GisClass {
  id: number;
  size: string;
  specification: string;
  protection_class: string;
}

export interface GisClassRequest {
  size?: string;
  specification__in?: string;
  protection_class?: string;
}