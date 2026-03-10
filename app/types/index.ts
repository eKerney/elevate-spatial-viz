export interface OvertureQueryParams {
  theme?: string;
  type?: string;
  minx: string | number;
  maxx: string | number;
  miny: string | number;
  maxy: string | number;
  limit?: string | number;
}

export interface OvertureResponse {
  features: any[];
}
