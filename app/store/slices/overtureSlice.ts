import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { OvertureCategories, OverturePlaces } from '@/app/types';

interface OvertureState {
  overturePlaces: Array<OverturePlaces>,
  overtureCategories: Array<OvertureCategories>,
};

const initialState: OvertureState = {
  overturePlaces: [],
  overtureCategories: []
}

export const overtureSlice = createSlice({
  name: 'overtureSlice',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ key: keyof OvertureState; value: OvertureState[keyof OvertureState] }>) => {
      state[action.payload.key] = action.payload.value as any;
    },
  },
});

export const selectOverture =
  <K extends keyof OvertureState>(key: K) =>
    (state: RootState) => state.overtureSlice[key];
export const { setData } = overtureSlice.actions;

export default overtureSlice.reducer;
