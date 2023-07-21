import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerData} from "../../data/PlayerData";
import {coordToPosition} from "../../helpers";
import { mazeInitialState } from "./maze";
import {AppThunk} from "../index";
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

const playerInitialState = () => {
    const { data, params} = mazeInitialState();

    const startCoord = data.startCoord;
    const cellSize = params.cellSize;
    const playerSize = getPlayerSize(cellSize);

    return {
        params: {
            startCoord,
            cellSize,
            playerSize
        },
        data: new PlayerData(coordToPosition(startCoord, cellSize))
    }
}

const playerSlice = createSlice({
    name: 'player',
    initialState: playerInitialState(),
    reducers: {
        setParams(state, action: PayloadAction<{ startCoord: CoordinateType, cellSize: SizeType }>) {
            const { startCoord, cellSize } = action.payload;

            state.params = {
                startCoord,
                cellSize,
                playerSize: getPlayerSize(cellSize)
            };
        },
        generate(state) {
            state.data = new PlayerData(coordToPosition(state.params.startCoord, state.params.cellSize))
        },
        collectBonus(state) {
            state.data.collectedBonuses++;
        },
        recordStep(state) {
            state.data.stepsWalked++;
        },
        move(state, actions: PayloadAction<OrientationType>) {
            console.log(state.data.currentPosition)
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
            console.log(state.data.currentPosition)
        },
    },
})

export const fetchMazeSliceData = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    const dataFromMaze = state.maze;

    dispatch(playerActions.setParams({
        startCoord: dataFromMaze.data.startCoord,
        cellSize: dataFromMaze.params.cellSize
    }));
};

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;