import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MazeData} from "../../data/MazeData";
import { CoordinateType, MazeDataJsonType } from '../../utils/types/maze';
import {SizeType} from "../../utils/types/global";

const mazeInitialState = () => {
    const bonuses = 0;
    const enemies = 0;
    const fieldSize: SizeType = { width: 700, height: 700 };
    const mazeCells: SizeType = { width: 2, height: 2 };
    const cellSize = {
        width: fieldSize.width / mazeCells.width,
        height: fieldSize.height / mazeCells.height
    };

    return {
        data: new MazeData({ width: mazeCells.width, height: mazeCells.height }, bonuses, enemies).toJson(),
        params: {
            fieldSize,
            mazeCells,
            cellSize,
            bonuses,
            enemies,
            hudSize: {
                width: fieldSize.width,
                height: fieldSize.height / 7,
            },
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
            const { level } = state.params;
            const levelIsOdd = level % 2 !== 0;
            const levelIsDivisibleBy3 = level % 3 === 0;
            
            state.params.mazeCells.height = (levelIsOdd || level < 4 ) ? state.params.mazeCells.height + 1 : state.params.mazeCells.height;
            state.params.mazeCells.width = (levelIsOdd || level < 4 ) ? state.params.mazeCells.width + 1 : state.params.mazeCells.width;
            state.params.bonuses = !levelIsOdd ? state.params.bonuses + 1 : state.params.bonuses;
            state.params.enemies = levelIsDivisibleBy3 ? state.params.enemies + 1 : state.params.enemies;
            
            state.params.cellSize.height = state.params.fieldSize.height / state.params.mazeCells.height;
            state.params.cellSize.width = state.params.fieldSize.width / state.params.mazeCells.width;
            
            const { bonuses, enemies, mazeCells } = state.params;
            
            // ** Quick fix for luck of generated enemies
            let data: MazeDataJsonType;
            let trialTimes = 0;
            while (true) {
                data = new MazeData(mazeCells, bonuses, enemies).toJson();
                trialTimes++;
                if (data.enemies.length === state.params.enemies || trialTimes > 10) break;
            }
            state.data = data;
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
        },
        
        resize(state, action: PayloadAction<SizeType>) {
            state.params.fieldSize.width = action.payload.width;
            state.params.fieldSize.height = action.payload.height;
            state.params.cellSize.width = state.params.fieldSize.width / state.params.mazeCells.width;
            state.params.cellSize.height = state.params.fieldSize.height / state.params.mazeCells.height;
            
            state.params.hudSize.width = state.params.fieldSize.width;
            state.params.hudSize.height = state.params.fieldSize.height / 7;
        },
    }
})

export const mazeActions = mazeSlice.actions;
export const mazeReducer = mazeSlice.reducer;