import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerMoveKeys} from "../../utils/types/player";

type FrozenModeType = 'won' | 'lost' | 'pause' | 'none';

type StateType = {
    frozen: boolean,
    playerMoveDir: PlayerMoveKeys | null,
    frozenMode: FrozenModeType,
    playerDeath: number
}
const gameplayInitialState: StateType = {
    frozen: false,
    frozenMode: 'none',
    playerMoveDir: null,
    playerDeath: 0
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
        recordDeath(state) {
            state.playerDeath++;
        }
    }
})

export const gameplayActions = gameplaySlice.actions;
export const gameplayReducer = gameplaySlice.reducer;

