import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerMoveKeys} from "../../utils/types/player";

type FrozenModeType = 'won' | 'lost' | 'pause' | 'none';

type StateType = {
    frozen: boolean,
    playerMoveDir: PlayerMoveKeys | null,
    frozenMode: FrozenModeType,
    musicVolume: number,
    soundVolume: number,
    firstLaunch: boolean
}
const gameplayInitialState: StateType = {
    frozen: false,
    frozenMode: 'none',
    playerMoveDir: null,
    musicVolume: 20,
    soundVolume: 30,
    firstLaunch: true,
};
const gameplaySlice = createSlice({
    name: 'gameplay',
    initialState: gameplayInitialState,
    reducers: {
        froze(state, action: PayloadAction<FrozenModeType>) {
            state.frozenMode = action.payload;
            state.frozen = true;
        },
        unfroze(state) {
            state.frozen = false;
            state.frozenMode = 'none';
        },
        playerMove(state, action: PayloadAction<PlayerMoveKeys | null>) {
            state.playerMoveDir = action.payload;
        },

        setMusicVolume(state, action: PayloadAction<number>) {
            state.musicVolume = action.payload;
        },
        setSoundVolume(state, action: PayloadAction<number>) {
            state.soundVolume = action.payload;
        },
        setFirstLaunch(state) {
            state.firstLaunch = !state.firstLaunch;
        }
    }
})

export const gameplayActions = gameplaySlice.actions;
export const gameplayReducer = gameplaySlice.reducer;

