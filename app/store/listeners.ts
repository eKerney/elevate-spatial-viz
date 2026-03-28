import { Action, ListenerEffectAPI } from "@reduxjs/toolkit";
import { selectTexture, setData } from "./slices/textureSlice";
import { AppDispatch, RootState } from "./store";


export const calculationConfigListener = {
  predicate: (action: Action, currentState: RootState, previousState: RootState) => {
    if (!setData.match(action)) return false;
    if (action.payload.key !== 'calculationConfig') return false;
    const prev = selectData('calculationConfig')(previousState);
    const next = selectData('calculationConfig')(currentState);
    return prev !== next;
  },
  effect: (_action: Action, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
    const aoiGeometry = selectData('aoiGeometry')(listenerApi.getState());
    const calculationConfig = selectData('calculationConfig')(listenerApi.getState());
    calculationIterator(calculationConfig, aoiGeometry, AudubonMultibandClippedURL);
  }
}
