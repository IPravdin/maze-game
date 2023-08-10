import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MazeData} from "../../data/MazeData";
import {CoordinateType} from "../../utils/types/maze";
import {SizeType} from "../../utils/types/global";

const mazeInitialState = () => {
    const bonuses = 1;
    const enemies = 0;
    const fieldSize: SizeType = { width: 700, height: 700 };
    const mazeCells: SizeType = { width: 4, height: 4 };

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

            state.data = new MazeData(mazeCells, bonuses, enemies).toJson();
        },
        generateNext(state) {
            state.params.mazeCells.height++;
            state.params.mazeCells.width++;
            state.params.enemies = state.params.enemies + 0.5;
            state.params.bonuses++;
            state.params.cellSize.height = state.params.fieldSize.height / state.params.mazeCells.height;
            state.params.cellSize.width = state.params.fieldSize.width / state.params.mazeCells.width;

            const { bonuses, enemies, mazeCells } = state.params;

            state.data = new MazeData(mazeCells, bonuses, enemies).toJson();
        },
        setMazeCells(state, action: PayloadAction<SizeType>) {
            state.params.mazeCells = action.payload;

            state.params.cellSize = {
                width: state.params.fieldSize.width / state.params.mazeCells.width,
                height: state.params.fieldSize.height / state.params.mazeCells.height
            };
        },
        setFieldSize(state, action: PayloadAction<SizeType>) {
            state.params.fieldSize = action.payload;

            state.params.cellSize = {
                width: state.params.fieldSize.width / state.params.mazeCells.width,
                height: state.params.fieldSize.height / state.params.mazeCells.height
            };
        },

        setBonusCollected(state, action : PayloadAction<CoordinateType>) {
            state.data.mazeMap[action.payload.x][action.payload.y].bonus.collected = true;
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