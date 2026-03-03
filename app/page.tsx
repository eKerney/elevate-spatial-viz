'use client';
import { MapViewState } from "deck.gl";
import { DeckMap } from "./DeckMap";
import Panel from "./components/Panel";
import { useState } from "react";

export default function Home() {
  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -110,
    latitude: 37.7853,
    zoom: 3.8,
    pitch: 50,
    bearing: 0,
  };
  const [chatMessages, setChatMessages] = useState<Array<string>>([]);
  return (
    <div className="h-screen w-screen overflow-hidden ">
      <Panel
        key='chatPanel'
        position='bottomLeft'
        className='w-[96%]
          h-3/12 sm:h-3/12 md:h-3/12 lg:h-13/12 xl:h-4/12
          bg-transparent backdrop-blur-xl 
          rounded-lg shadow-xl p-4 z-50 '
        messages={chatMessages}
      >
        <Panel
          key='leftPanel'
          position='smallLeft'
          className='w-4/12 h-full
          bg-gray-800/70 backdrop-blur-xl border-2 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
          messages={chatMessages}
        />
        <Panel
          key='leftPanel'
          position='smallMiddle'
          className='w-4/12 h-full
          bg-gray-800/70 backdrop-blur-xl border-2 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
          messages={chatMessages}
        />
        <Panel
          key='leftPanel'
          position='smallRight'
          className='w-4/12 h-full
          bg-gray-800/70 backdrop-blur-xl border-2 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
          messages={chatMessages}
        />
      </Panel>
      <DeckMap
        view_state={INITIAL_VIEW_STATE}
        layers={[]}
      />
    </div>
  );
}
