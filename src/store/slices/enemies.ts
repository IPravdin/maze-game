import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {coordToPosition} from "../../helpers";
import { mazeInitialState } from "./maze";
import {PlayerSizeType, PositionType, SizeType} from "../../types/global";
import {CurrMovCoordType, EnemyData} from "../../data/EnemyData";
import {EnemySpeed} from "../../enums/enemy-speed";

const getEnemySize = (cellSize: SizeType): PlayerSizeType => {
    return {
        width: cellSize.width - 15,
        height: cellSize.width - 15,
        borderWidth: 2.5,
        margin: 5,
    }
}

const enemiesInitialState = () => {
    const { params, data} = mazeInitialState();

    const size = getEnemySize(params.cellSize);
    const defaultSpeed = EnemySpeed.slow;
    const enemies = data.enemies.map((enemy) => new EnemyData({
        ...enemy,
        currentPosition: coordToPosition(enemy.spawn, params.cellSize)
    }).toJson())

    return {
        params: {
            size,
            defaultSpeed,
            speed: defaultSpeed
        },
        data: enemies
    }
}

const enemiesSlice = createSlice({
    name: 'enemies',
    initialState: enemiesInitialState(),
    reducers: {
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
            const { id, currentPosition, currMovCoord} = action.payload;
            state.data[id].currentPosition = currentPosition;
            state.data[id].currMovCoord = currMovCoord;
        }
    },
})

export const enemiesActions = enemiesSlice.actions;
export const enemiesReducer = enemiesSlice.reducer;