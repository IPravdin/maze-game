import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnemySizeType, PlayerSizeType, PositionType, SizeType} from "../../types/global";
import {CurrMovCoordType, EnemyData, EnemyDataJson} from "../../data/EnemyData";
import {EnemySpeed} from "../../enums/enemy-speed";
import {MazeEnemy} from "../../types/enemy";
import {coordToPosition} from "../../helpers";

const getEnemySize = (cellSize: SizeType): PlayerSizeType => {
    return {
        width: cellSize.width - 15,
        height: cellSize.width - 15,
        borderWidth: 2.5,
        margin: 5,
    }
}

const initialState: EnemiesState = {
    params: {
        size: { width: 0, height: 0, borderWidth: 0, margin: 0},
        defaultSpeed: EnemySpeed.stop,
        speed: EnemySpeed.stop,
    },
    data: null
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

            state.data = mazeEnemies.map((enemy) => new EnemyData(
                {
                    ...enemy,
                    currentPosition: coordToPosition(enemy.spawn, cellSize)
                }).toJson()
            );
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
        setNewPosition(state, action: PayloadAction<{ id: number, currentPosition: PositionType, currMovCoord: CurrMovCoordType }>) {
            if (!state.data) return;

            const { id, currentPosition, currMovCoord} = action.payload;
            state.data[id].currentPosition = currentPosition;
            state.data[id].currMovCoord = currMovCoord;
        }
    },
})

type EnemiesState = {
    params: {
        size: EnemySizeType,
        defaultSpeed: EnemySpeed,
        speed: EnemySpeed
    },
    data: EnemyDataJson[] | null
}
export const enemiesActions = enemiesSlice.actions;
export const enemiesReducer = enemiesSlice.reducer;