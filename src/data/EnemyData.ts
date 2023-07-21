import {PositionType} from "../types/global";
import {CreatureData} from "./CreatureData";
import {CoordinateType} from "../types/maze";
import {MazeEnemy} from "../types/enemy";

export type CurrMovCoordType = {
    dirIndex: number,
    posInDir: number,
    prevPosInDir: number
}

type Props = MazeEnemy & {
    currentPosition: PositionType;
}
export class EnemyData extends CreatureData{
    readonly spawn: CoordinateType
    readonly notSpawnRadius: CoordinateType[][]
    readonly movement: CoordinateType[][]
    public currMovCoord: CurrMovCoordType

    constructor({ currentPosition, spawn, movement, notSpawnRadius }: Props) {
        super(currentPosition);

        this.spawn = spawn;
        this.movement = movement;
        this.notSpawnRadius = notSpawnRadius;
        this.currMovCoord = {
            dirIndex: -1,
            posInDir: -1,
            prevPosInDir: -1
        }
    }

    toJson = () => ({
        spawn: this.spawn,
        notSpawnRadius: this.notSpawnRadius,
        movement: this.movement,
        currMovCoord: this.currMovCoord,
        currentPosition: this.currentPosition,
        alive: this.alive
    })
}