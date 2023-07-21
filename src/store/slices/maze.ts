import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MazeData} from "../../data/MazeData";
import {CoordinateType} from "../../types/maze";
import {SizeType} from "../../types/global";

export const mazeInitialState = () => {
    const bonuses = 10;
    const enemies = 4;
    const fieldSize: SizeType = { width: 800, height: 800 };
    const mazeCells: SizeType = { width: 20, height: 20 };

    return {
        data: new MazeData({ width: mazeCells.width, height: mazeCells.height }, bonuses, enemies).toJson(),
        params: {
            fieldSize,
            mazeCells,
            cellSize: {
                width: fieldSize.width / mazeCells.width,
                height: fieldSize.height / mazeCells.height
            },
            bonuses,
            enemies,
        },
    }
}

const mazeSlice = createSlice({
    name: 'maze',
    initialState: mazeInitialState(),
    reducers: {
        generate(state) {
            const { bonuses, enemies, mazeCells } = state.params;
            const { width, height} = mazeCells;

            state.data = new MazeData({ width, height }, bonuses, enemies).toJson();
        },
        setBonusCollected(state, action : PayloadAction<CoordinateType>) {
            state.data.mazeMap[action.payload.x][action.payload.y].bonus.collected = true;
        },

        setFieldSize(state, action: PayloadAction<SizeType>) {
            state.params.fieldSize = action.payload;

            state.params.cellSize = {
                width: state.params.fieldSize.width / state.params.mazeCells.width,
                height: state.params.fieldSize.height / state.params.mazeCells.height
            };
        },
        setMazeCells(state, action: PayloadAction<SizeType>) {
            state.params.mazeCells = action.payload;

            state.params.cellSize = {
                width: state.params.fieldSize.width / state.params.mazeCells.width,
                height: state.params.fieldSize.height / state.params.mazeCells.height
            };
        },

        setBonuses(state, action: PayloadAction<number>) {
            state.params.bonuses = action.payload;
        },

        setEnemies(state, action: PayloadAction<number>) {
            state.params.enemies = action.payload;
        }
    }
})

export const mazeActions = mazeSlice.actions;
export const mazeReducer = mazeSlice.reducer;