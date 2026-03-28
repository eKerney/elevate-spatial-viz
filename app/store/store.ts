import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit';
import { textureSlice } from './slices/textureSlice';
import { overtureSlice } from './slices/overtureSlice';

const listenerMiddleware = createListenerMiddleware();
// listenerMiddleware.startListening(selectAOIListener);

const rootReducer = combineReducers({
  textureSlice: textureSlice.reducer,
  overtureSlice: overtureSlice.reducer,
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
