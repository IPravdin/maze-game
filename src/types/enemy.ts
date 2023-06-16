import {Coordinate} from "./maze";

export type MazeEnemy = {
    spawn: Coordinate,
    notSpawnRadius: Coordinate[][],
    movement: Coordinate[][]
}