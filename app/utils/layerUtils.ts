import { ScatterplotLayer } from "deck.gl";

export const createPlacesLayer = (data: any) => {

  const pointLayer = new ScatterplotLayer({
    id: 'places-layer',
    data: data,
    getPosition: (d) => [d[5], d[6]],
    getRadius: 20,
    getLineColor: [255, 255, 255],
    getLineWidth: 1,
    stroked: true,
    pickable: true,
    getFillColor: d => [(40 + (d[4] * 100)), (120 + (d[4] * 100)), 200 - (d[4] * 100)],
    autoHighlight: true,
    highlightColor: [0, 255, 208],
    opacity: 0.9
  })

  return pointLayer;
}
