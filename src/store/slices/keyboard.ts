import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerMoveKeys} from "../../types/player";

const keyboardInitialState: { pause: boolean, playerMoveDir: PlayerMoveKeys | null } = {
    pause: false,
    playerMoveDir: null
};
const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState: keyboardInitialState,
    reducers: {
        pause(state) {
            state.pause = !state.pause;
        },
        playerMove(state, action: PayloadAction<PlayerMoveKeys | null>) {
            state.playerMoveDir = action.payload;
        }
    }
})

export const keyboardActions = keyboardSlice.actions;
export const keyboardReducer = keyboardSlice.reducer;

