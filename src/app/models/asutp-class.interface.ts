export interface AsutpClass {
  id: number;
  specification: string;
  protection_class: string;
}

export interface AsutpClassRequest {
  specification__in?: string;
  protection_class?: string;
}