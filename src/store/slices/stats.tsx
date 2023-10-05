import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { returnBonusCollectionRate } from '../../utils/helpers';

type StatType = {
    name: string,
    playerTotalDeath: number,
    playerLevelDeath: number,
    levelsCompleted: number,
    bonusesCollected: number,
    bonusesTotal: number,
    stepsWalked: number,
}
type HistoryStatType = Omit<StatType, "playerLevelDeath">;

type StateType = {
    current: StatType,
    history: HistoryStatType[]
}
const statsInitialState: StateType = {
    current: {
        name: 'Player',
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
        changeName(state, action: PayloadAction<string>) {
            state.current.name = action.payload;
        },

        reset(state) {
            const recordedState: HistoryStatType = { ...state.current };
            // @ts-ignore
            delete recordedState.playerLevelDeath;
            const newState = state.history.concat(recordedState);
            newState.sort((a, b) => returnStatRate(a, b));
            if (newState.length > 5) newState.pop();
            state.history = newState;
            
            Object.keys(state.current).forEach((key) => {
                // @ts-ignore
                state.current[key] = statsInitialState.current[key];
            });
        }
    }
})

export const statsActions = statsSlice.actions;
export const statsReducer = statsSlice.reducer;

function returnStatRate(a: HistoryStatType, b: HistoryStatType) {
    let rate = 0;
    const aBonusColRate = returnBonusCollectionRate(a.bonusesCollected, a.bonusesTotal);
    const bBonusColRate = returnBonusCollectionRate(b.bonusesCollected, b.bonusesTotal);
    
    if (a.levelsCompleted > b.levelsCompleted) rate -= 0.6;
    if (a.levelsCompleted < b.levelsCompleted) rate += 0.6;
    if (aBonusColRate > bBonusColRate) rate -= 0.2;
    if (aBonusColRate < bBonusColRate) rate += 0.2;
    if (a.playerTotalDeath < b.playerTotalDeath) rate -= 0.2;
    if (a.playerTotalDeath > b.playerTotalDeath) rate += 0.2;
    
    return rate;
}