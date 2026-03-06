import { ScatterplotLayer } from "deck.gl";

export const createPlacesLayer = (data: any) => {

  const pointLayer = new ScatterplotLayer({
    id: 'places-layer',
    data: data,
    getPosition: (d) => [d[5], d[6]],
    getRadius: 10,
    getLineColor: [255, 255, 255],
    getLineWidth: 200,
    stroked: true,
    pickable: true,
    // getFillColor: d => [(255 - (d.elevation * .1)), (140 + (d.elevation * .001)), (d.elevation * .50)],
    autoHighlight: true,
    highlightColor: [0, 255, 208],
    opacity: 0.3
  })

  return pointLayer;
}
