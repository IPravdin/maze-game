import { Action, combineReducers, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { mazeReducer } from './slices/maze';
import { playerReducer } from './slices/player';
import { gameplayReducer } from './slices/gameplay';
import { enemiesReducer } from './slices/enemies';
import { statsReducer } from './slices/stats';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  maze: mazeReducer,
  player: playerReducer,
  gameplay: gameplayReducer,
  enemies: enemiesReducer,
  stats: statsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export const persistor = persistStore(store);

export default store;