import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerData, PlayerDataJsonType} from "../../data/PlayerData";
import {coordToPosition} from "../../helpers";
import {CoordinateType, OrientationType} from "../../types/maze";
import {PlayerSizeType, SizeType} from "../../types/global";

const getPlayerSize = (cellSize: SizeType): PlayerSizeType => {
    return {
        width: cellSize.width - 15,
        height: cellSize.width - 15,
        borderWidth: 2.5,
        margin: 5,
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
        move(state, actions: PayloadAction<OrientationType>) {
            if (!state.data) return;

            switch (actions.payload) {
                case 'left':
                    state.data.currentPosition.left -= state.params.cellSize.width;
                    break;
                case 'right':
                    state.data.currentPosition.left += state.params.cellSize.width;
                    break;
                case 'top':
                    state.data.currentPosition.top -= state.params.cellSize.height;
                    break;
                case 'bottom':
                    state.data.currentPosition.top += state.params.cellSize.height;
                    break;
            }
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