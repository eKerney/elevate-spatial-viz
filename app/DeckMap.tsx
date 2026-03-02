import DeckGL, { Layer, MapViewState } from 'deck.gl';
import { Map, FullscreenControl } from 'react-map-gl/maplibre';

export const DeckMap = ({ view_state, layers }: {
  view_state: MapViewState,
  layers: Layer[],
}) => {
  const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;

  return (
    <DeckGL
      initialViewState={view_state}
      controller
      layers={layers}
    >
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={"https://api.maptiler.com/maps/019cafff-3e33-7b71-99dc-1e5d9791e00d/style.json?key=" + MAP_KEY}
      >
        <FullscreenControl />
      </Map>
    </DeckGL >
  )
};
