import { ScatterplotLayer } from "deck.gl";
import { OverturePlaces } from "../types";
import { CesiumIonLoader } from "@loaders.gl/3d-tiles";
import { Tileset3D } from "@loaders.gl/tiles";
import { MapViewState, Tile3DLayer } from "deck.gl";
import { Dispatch, SetStateAction } from "react";

const CESIUM_KEY = process.env.NEXT_PUBLIC_CESIUM;
export const createTileLayer3D = (
  setInitialViewState: SetStateAction<Dispatch<MapViewState>>
): Tile3DLayer => {


  const tileLayer = new Tile3DLayer({
    id: 'melbourne-photogrammetry',
    // data: 'https://assets.cesium.com/69380/tileset.json',
    data: 'https://assets.cesium.com/43978/tileset.json',
    loader: CesiumIonLoader,
    loadOptions: {
      'cesium-ion': { accessToken: CESIUM_KEY }
    },
    pointSize: 2,
    pickable: '3d',
    operation: 'terrain+draw',
    onTilesetLoad: (tileset) => console.log('OSM Buildings loaded'),
  });

  return tileLayer;
}

export const createPlacesLayer = (data: OverturePlaces[]) => {
  console.log('createPlaces', data)

  const pointLayer = new ScatterplotLayer({
    id: 'places-layer',
    data: data,
    getPosition: (d: OverturePlaces) => [d.longitude, d.latitude],
    getRadius: 20,
    getLineColor: [255, 255, 255],
    getLineWidth: 1,
    stroked: true,
    pickable: true,
    getFillColor: (d: OverturePlaces) => [(40 + (d.certainty * 100)), (120 + (d.certainty * 100)), 200 - (d.certainty * 100)],
    autoHighlight: true,
    highlightColor: [0, 255, 208],
    opacity: 0.9
  })

  return pointLayer;
}
