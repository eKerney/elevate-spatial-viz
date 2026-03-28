'use client';
import { Layer, MapViewState, ScatterplotLayer } from "deck.gl";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import { DeckMap } from "./components/DeckMap";
import { useOvertureData } from "./hooks/useOvertureData";
import { createPlacesLayer } from "./utils/layerUtils";
import { OvertureQueryParams } from "./types";
import { useOvertureCategories } from "./hooks/useOvertureCategories";
import { selectOverture, setData } from "./store/slices/overtureSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -85.55,
    latitude: 42.30,
    zoom: 12,
    pitch: 30,
    bearing: 0,
  };
  const [chatMessages, setChatMessages] = useState<Array<string>>([]);
  const [placesLayer, setPlacesLayer] = useState<Layer | null>();
  const overtureParams: OvertureQueryParams = {
    theme: 'places',
    type: 'place',
    minx: '-85.60',
    maxx: '-85.58',
    miny: '42.28',
    maxy: '42.30',
    limit: '10',
  };
  const { features, loading, error, updateParams } = useOvertureData(overtureParams);
  // run once on init
  const { data, loadingCat, errorCat } = useOvertureCategories();
  const dispatch = useDispatch();
  // dispatch(setData({ key: 'selectedMaskingLayers', value: layers }));
  // useEffect(() => dispatch(setData({ key: 'overtureCategories', value: data })), [data]);
  useEffect(() => setPlacesLayer(createPlacesLayer(features)), [features]);

  return (
    <div className="h-screen w-screen overflow-hidden relative  ">
      <Panel
        key='chatPanel'
        position='bottomLeft'
        className='w-[96%]
          h-3/12 sm:h-3/12 md:h-3/12 lg:h-13/12 xl:h-4/12 
          bg-transparent z-50 '
        messages={chatMessages}
      >
        <Panel
          key='smallLeft'
          position='smallLeft'
          className='w-[31vw] h-72
          bg-gray-800/70 backdrop-blur-xl border-2 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
          messages={chatMessages}
        >
          Where is the Focal Geography?
          {loading && 'Loading places...'}
        </Panel>
        <Panel
          key='smallMiddle'
          position='smallMiddle'
          className='w-[31vw] h-72
          bg-gray-800/70 backdrop-blur-xl border-2 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
          messages={chatMessages}
        >
          Which Criteria are of Interest?
        </Panel>
        <Panel
          key='smallRight'
          position='smallRight'
          className='w-[31vw] h-72
          bg-gray-800/70 backdrop-blur-xl border-2 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
          messages={chatMessages}
        >
          What is the timeframe?
        </Panel>
      </Panel>
      <DeckMap
        view_state={INITIAL_VIEW_STATE}
        layers={[placesLayer]}
      />
    </div>
  );
}
