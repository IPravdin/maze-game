import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerMoveKeys} from "../../utils/types/player";

type FrozenModeType = 'won' | 'lost' | 'pause' | 'none';

type StateType = {
    frozen: boolean,
    playerMoveDir: PlayerMoveKeys | null,
    frozenMode: FrozenModeType,
    playerDeath: number,
    levelsCompleted: number,
    bonusesCollected: number,
    bonusesTotal: number,
    stepsWalked: number,
    musicVolume: number,
    soundVolume: number,
}
const gameplayInitialState: StateType = {
    frozen: false,
    frozenMode: 'none',
    playerMoveDir: null,
    playerDeath: 0,
    levelsCompleted: 0,
    bonusesCollected: 0,
    bonusesTotal: 0,
    stepsWalked: 0,
    musicVolume: 20,
    soundVolume: 30,
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
        },
        recordLevel(state) {
            state.levelsCompleted++;
        },
        addBonusesCollected(state, action: PayloadAction<number>) {
            state.bonusesCollected += action.payload;
        },
        addBonusesTotal(state, action: PayloadAction<number>) {
            state.bonusesTotal += action.payload;
        },
        addStepsWalked(state, actions: PayloadAction<number>) {
            state.stepsWalked += actions.payload;
        },

        setMusicVolume(state, action: PayloadAction<number>) {
            state.musicVolume = action.payload;
        },
        setSoundVolume(state, action: PayloadAction<number>) {
            state.soundVolume = action.payload;
        },
    }
})

export const gameplayActions = gameplaySlice.actions;
export const gameplayReducer = gameplaySlice.reducer;

