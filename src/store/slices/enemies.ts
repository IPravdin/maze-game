import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnemySizeType, PlayerSizeType, SizeType} from "../../types/global";
import {EnemySpeed} from "../../enums/enemy-speed";
import {MazeEnemy} from "../../types/enemy";
import {CoordinateType} from "../../types/maze";
import {keyboardActions} from "./keyboard";

const getEnemySize = (cellSize: SizeType): PlayerSizeType => {
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

const initialState: EnemiesState = {
    params: {
        size: { width: 0, height: 0, borderWidth: 0, margin: 0},
        defaultSpeed: EnemySpeed.stop,
        speed: EnemySpeed.stop,
    },
    data: {
        enemiesCurCoords: null
    }
}

const enemiesSlice = createSlice({
    name: 'enemies',
    initialState,
    reducers: {
        setState(state, action: PayloadAction<{ cellSize: SizeType, mazeEnemies: MazeEnemy[] }>) {
            const { cellSize, mazeEnemies } = action.payload;
            const defaultSpeed = EnemySpeed.medium;

            state.params = {
                size: getEnemySize(cellSize),
                defaultSpeed: defaultSpeed,
                speed: defaultSpeed,
            };

            state.data.enemiesCurCoords = mazeEnemies.map((enemy) => enemy.spawn);
        },
        freezeEnemies(state) {
            state.params.speed = EnemySpeed.stop;
        },
        unfreezeEnemies(state) {
            state.params.speed = state.params.defaultSpeed;
        },
        setDefaultSpeed(state, action: PayloadAction<EnemySpeed>) {
            state.params.defaultSpeed = action.payload;
        },
        recordCoord(state, action: PayloadAction<{ id: number, newCoord: CoordinateType }>) {
            if (!state.data.enemiesCurCoords) return;
            const { id, newCoord} = action.payload;

            state.data.enemiesCurCoords[id] = newCoord;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(keyboardActions.froze, (state) => {
                state.params.speed = EnemySpeed.stop;
            })
            .addCase(keyboardActions.unfroze, (state) => {
                state.params.speed = state.params.defaultSpeed;
            })

    }
})

type EnemiesState = {
    params: {
        size: EnemySizeType,
        defaultSpeed: EnemySpeed,
        speed: EnemySpeed
    },
    data: {
        enemiesCurCoords: CoordinateType[] | null
    }
}
export const enemiesActions = enemiesSlice.actions;
export const enemiesReducer = enemiesSlice.reducer;