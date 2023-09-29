import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MazeData} from "../../data/MazeData";
import {CoordinateType} from "../../utils/types/maze";
import {SizeType} from "../../utils/types/global";

const mazeInitialState = () => {
    const bonuses = 0;
    const enemies = 0;
    const fieldSize: SizeType = { width: 700, height: 700 };
    const mazeCells: SizeType = { width: 2, height: 2 };

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
            level: 1,
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
            state.params.level++;
            state.params.mazeCells.height++;
            state.params.mazeCells.width++;
            state.params.bonuses++;
            state.params.cellSize.height = state.params.fieldSize.height / state.params.mazeCells.height;
            state.params.cellSize.width = state.params.fieldSize.width / state.params.mazeCells.width;
            
            const levelIsOdd = state.params.level % 2 !== 0;
            state.params.enemies = levelIsOdd ? state.params.enemies + 1 : state.params.enemies;

            const { bonuses, enemies, mazeCells } = state.params;

            state.data = new MazeData(mazeCells, bonuses, enemies).toJson();
        },
        generateOneMore(state) {
            // Restore bonuses
            state.data.mazeMap.forEach((row) => row.forEach((cell) => {
                if (cell.bonus.placed) {
                    cell.bonus.collected = false;
                }
            }))
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
        },

        reset(state) {
            const newState = mazeInitialState();

            Object.keys(state).forEach((key) => {
                // @ts-ignore
                state[key] = newState[key];
            })
        }
    }
})

export const mazeActions = mazeSlice.actions;
export const mazeReducer = mazeSlice.reducer;