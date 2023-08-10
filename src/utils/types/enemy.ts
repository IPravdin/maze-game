import {CoordinateType} from "./maze";

export type MazeEnemy = {
    spawn: CoordinateType,
    notSpawnRadius: CoordinateType[][],
    movement: CoordinateType[][]
}