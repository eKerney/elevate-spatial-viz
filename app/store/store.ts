import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit';
import { textureSlice } from './slices/textureSlice';

const listenerMiddleware = createListenerMiddleware();
// listenerMiddleware.startListening(selectAOIListener);

const rootReducer = combineReducers({
  textureSlice
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;
