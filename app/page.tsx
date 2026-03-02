'use client';
import { MapViewState } from "deck.gl";
import { DeckMap } from "./DeckMap";

export default function Home() {
  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -110,
    latitude: 37.7853,
    zoom: 3.8,
    pitch: 50,
    bearing: 0,
  };
  return (
    <div className="grid grid-cols-12 gap-0 h-screen overflow-hidden ">
      <DeckMap
        view_state={INITIAL_VIEW_STATE}
        layers={[]}
      />
    </div>
  );
}
