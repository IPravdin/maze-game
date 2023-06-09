import {PositionType} from "../types/global";


export class CreatureData {
    public position: PositionType
    public alive: boolean

    constructor(position: PositionType) {
        this.position = position
        this.alive = true
    }
}