import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerMoveKeys} from "../../types/player";

type FrozenModeType = 'won' | 'lost' | 'pause' | 'none';

const gameplayInitialState: { frozen: boolean, playerMoveDir: PlayerMoveKeys | null, frozenMode: FrozenModeType} = {
    frozen: false,
    frozenMode: 'none',
    playerMoveDir: null,
};
const gameplaySlice = createSlice({
    name: 'gameplay',
    initialState: gameplayInitialState,
    reducers: {
        froze(state, action: PayloadAction<FrozenModeType>) {
            state.frozen = true;
            state.frozenMode = action.payload;
        },
        unfroze(state) {
            state.frozen = false;
            state.frozenMode = 'none';
        },
        playerMove(state, action: PayloadAction<PlayerMoveKeys | null>) {
            state.playerMoveDir = action.payload;
        },
    }
})

export const gameplayActions = gameplaySlice.actions;
export const gameplayReducer = gameplaySlice.reducer;

