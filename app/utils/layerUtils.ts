import { ScatterplotLayer } from "deck.gl";
import { OverturePlaces } from "../types";

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
