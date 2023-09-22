import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type StatType = {
    playerTotalDeath: number,
    playerLevelDeath: number,
    levelsCompleted: number,
    bonusesCollected: number,
    bonusesTotal: number,
    stepsWalked: number,
}

type StateType = {
    current: StatType,
    history: Omit<StatType, "current.playerLevelDeath">[]
}
const statsInitialState: StateType = {
    current: {
        playerTotalDeath: 0,
        playerLevelDeath: 0,
        levelsCompleted: 0,
        bonusesCollected: 0,
        bonusesTotal: 0,
        stepsWalked: 0,
    },
    history: []
};
const statsSlice = createSlice({
    name: 'stats',
    initialState: statsInitialState,
    reducers: {
        recordLevelDeath(state) {
            state.current.playerLevelDeath++;
        },
        addLevelToTotalDeath(state) {
            state.current.playerTotalDeath += state.current.playerLevelDeath;
            state.current.playerLevelDeath = 0;
        },
        recordLevel(state) {
            state.current.levelsCompleted++;
        },
        addBonusesCollected(state, action: PayloadAction<number>) {
            state.current.bonusesCollected += action.payload;
        },
        addBonusesTotal(state, action: PayloadAction<number>) {
            state.current.bonusesTotal += action.payload;
        },
        addStepsWalked(state, actions: PayloadAction<number>) {
            state.current.stepsWalked += actions.payload;
        },

        reset(state) {
            const recordedState = { ...state.current };
            // @ts-ignore
            delete recordedState.playerLevelDeath;
            state.history = state.history.concat(recordedState);

            Object.keys(state.current).forEach((key) => {
                // @ts-ignore
                state.current[key] = statsInitialState.current[key];
            });
        }
    }
})

export const statsActions = statsSlice.actions;
export const statsReducer = statsSlice.reducer;