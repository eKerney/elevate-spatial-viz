import { argv0 } from "process";

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

export type OverturePlaces = {
  placeID: string;
  categoryCode: string;
  placeName: string;
  taxonomy: string;
  certainty: number;
  longitude: number;
  latitude: number;
  geoJSONgeometryString: string;
}

export type OvertureCategories = {
  categoryCode: string;
  overtureTaxonomy: string[];
}

export type BoundingBox = {
  minx: number;
  maxx: number;
  miny: number;
  maxy: number;
}

export type Position = [number, number, number?];

export interface LineString {
  type: 'LineString';
  coordinates: Array<Position>;
}
export interface Polygon {
  type: 'Polygon';
  coordinates: Position[][];
}
export interface Point {
  type: 'Point';
  coordinates: Position;
}

export type Geometry = LineString | Polygon | Point;

// Properties: Generic to allow any key-value pairs
export type Properties = { [key: string]: unknown };

export interface Feature<T extends Geometry = Geometry, P = Properties> {
  type: 'Feature';
  geometry: T | null;
  properties: P;
  id?: string | number;
}

export interface GeoJSONgeneric<T extends Geometry = Geometry, P = Properties> {
  type: 'FeatureCollection';
  features: Feature<T, P>[];
}

export type Cardo = {
  bbox: BoundingBox;
  centerPoint?: Position;
  placeName?: string | null;
}

export type Traits = {
  type: string;
  theme: string;
  categoryCode?: string;
  overtureTaxonomy?: string;
}

export type Tempus = {
  startDate: string;
  endDate: string;
}
