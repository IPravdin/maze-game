import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerData, PlayerDataJsonType} from "../../data/PlayerData";
import {coordToPosition} from "../../helpers";
import {CoordinateType} from "../../types/maze";
import {CreatureSizeType, PositionType, SizeType} from "../../types/global";
import getCreatureSize, {initialCreatureSize} from "./get-creature-size";

const initialState: PlayerState = {
    params: {
        startCoord: { x: 0, y: 0},
        cellSize: { width: 0, height: 0},
        playerSize: initialCreatureSize,
    },
    data: null
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setState(state, action: PayloadAction<{ startCoord: CoordinateType, cellSize: SizeType }>) {
            const { startCoord, cellSize } = action.payload;

            state.params = {
                startCoord,
                cellSize,
                playerSize: getCreatureSize(cellSize)
            };

            state.data = new PlayerData(coordToPosition(startCoord, cellSize)).toJson();
        },
        collectBonus(state) {
            if (!state.data) return;

            state.data.collectedBonuses++;
        },
        recordStep(state) {
            if (!state.data) return;

            state.data.stepsWalked++;
        },
        move(state, actions: PayloadAction<PositionType>) {
            if (!state.data) return;

            state.data.currentPosition = actions.payload;
        },
        kill(state) {
            if (!state.data) return;

            state.data.alive = false;
        },
        revive(state) {
            if (!state.data) return;

            state.data.alive = true;
        }
    },
})

type PlayerState = {
    params: {
        startCoord: CoordinateType,
        cellSize: SizeType,
        playerSize: CreatureSizeType
    },
    data: PlayerDataJsonType | null
}

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;