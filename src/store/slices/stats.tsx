import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type StateType = {
    playerDeath: number,
    levelsCompleted: number,
    bonusesCollected: number,
    bonusesTotal: number,
    stepsWalked: number,
}
const statsInitialState: StateType = {
    playerDeath: 0,
    levelsCompleted: 0,
    bonusesCollected: 0,
    bonusesTotal: 0,
    stepsWalked: 0,
};
const statsSlice = createSlice({
    name: 'stats',
    initialState: statsInitialState,
    reducers: {
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

        reset(state) {
            Object.keys(state).forEach((key) => {
                // @ts-ignore
                state[key] = statsInitialState[key];
            });
        }
    }
})

export const statsActions = statsSlice.actions;
export const statsReducer = statsSlice.reducer;