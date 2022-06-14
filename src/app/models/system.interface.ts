export interface System {
  id: number;
  name: string;
  ispdn_classes: number[];
  gis_classes: number[];
  asutp_classes: number[];
  kii_classes: number[];
  assets: number[];
  negative_consequences: number[];
}

export interface SystemRequest {
  name: string;
  ispdn_classes?: number[];
  gis_classes?: number[];
  asutp_classes?: number[];
  kii_classes?: number[];
  assets: number[];
  negative_consequences: number[];
}