import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OvertureState {

}
interface Texture {
  cardo: Cardo,
  traits: Traits,
  tempus: Tempus,
}


const initialState: Texture = {
  cardo: { bbox: { minx: 0, maxx: 0, miny: 0, maxy: 0 }, centerPoint: [0, 0], placeName: '' },
  traits: { theme: 'places', type: 'place', categoryCode: '', overtureTaxonomy: '' },
  tempus: { startDate: new Date(), endDate: new Date() }
}


export const textureSlice = createSlice({
  name: 'textureSlice',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ key: keyof Texture; value: Texture[keyof Texture] }>) => {
      state[action.payload.key] = action.payload.value as any;
    },
  },
});

export const selectTexture =
  <K extends keyof Texture>(key: K) =>
    (state: RootState) =>
      state.textureSlice[key];
export const { setData } = textureSlice.actions;

export default textureSlice.reducer;
