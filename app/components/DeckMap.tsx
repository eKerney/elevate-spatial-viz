import DeckGL, { Layer, MapViewState } from 'deck.gl';
import { useMemo } from 'react';
import { Map, FullscreenControl } from 'react-map-gl/maplibre';

export const DeckMap = ({ view_state, layers }: {
  view_state: MapViewState,
  layers: Layer[],
}) => {
  const memoizedLayers = useMemo(() => [...layers], [layers]);

  const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
  const getTooltip = (info: any) => {
    if (!info.object) {
      return null;
    }
    return `\
    ${info.object[1]}
    ${info.object[2]}
    ${info.object[3]}`;
  };

  return (
    <DeckGL
      initialViewState={view_state}
      controller
      layers={[...memoizedLayers]}
      getTooltip={getTooltip}
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
// elev ${info.object.elevation} ft
