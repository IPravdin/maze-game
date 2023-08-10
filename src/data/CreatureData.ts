import {PositionType} from "../utils/types/global";


export class CreatureData {
    public currentPosition: PositionType
    public alive: boolean

    constructor(position: PositionType) {
        this.currentPosition = position
        this.alive = true
    }
}