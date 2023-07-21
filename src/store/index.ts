import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {mazeReducer} from "./slices/maze";
import {playerReducer} from "./slices/player";
import {keyboardReducer} from "./slices/keyboard";
import {enemiesReducer} from "./slices/enemies";

const store = configureStore({
    reducer: {
        maze: mazeReducer,
        player: playerReducer,
        keyboard: keyboardReducer,
        enemies: enemiesReducer
    }
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;