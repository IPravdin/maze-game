import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {mazeReducer} from "./slices/maze";
import {playerReducer} from "./slices/player";
import {gameplayReducer} from "./slices/gameplay";
import {enemiesReducer} from "./slices/enemies";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    maze: mazeReducer,
    player: playerReducer,
    gameplay: gameplayReducer,
    enemies: enemiesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);

export default store;