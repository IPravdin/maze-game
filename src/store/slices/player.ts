import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerData, PlayerDataJsonType} from "../../data/PlayerData";
import {coordToPosition} from "../../helpers";
import {CoordinateType} from "../../types/maze";
import {PlayerSizeType, PositionType, SizeType} from "../../types/global";

const getPlayerSize = (cellSize: SizeType): PlayerSizeType => {
    const borderWidth = 2.5;
    const margin = 5;
    const sum = borderWidth * 2 + margin;

    return {
        width: cellSize.width - sum,
        height: cellSize.height - sum,
        borderWidth,
        margin,
    }
}

const initialState: PlayerState = {
    params: {
        startCoord: { x: 0, y: 0},
        cellSize: { width: 0, height: 0},
        playerSize: { width: 0, height: 0, borderWidth: 0, margin: 0 }
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
                playerSize: getPlayerSize(cellSize)
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
    },
})

type PlayerState = {
    params: {
        startCoord: CoordinateType,
        cellSize: SizeType,
        playerSize: PlayerSizeType
    },
    data: PlayerDataJsonType | null
}

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;