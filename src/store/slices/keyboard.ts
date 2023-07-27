import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerMoveKeys} from "../../types/player";

type FrozenModeType = 'won' | 'lost' | 'pause' | 'none';

const keyboardInitialState: { frozen: boolean, playerMoveDir: PlayerMoveKeys | null, frozenMode: FrozenModeType} = {
    frozen: false,
    frozenMode: 'none',
    playerMoveDir: null,
};
const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState: keyboardInitialState,
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

export const keyboardActions = keyboardSlice.actions;
export const keyboardReducer = keyboardSlice.reducer;

