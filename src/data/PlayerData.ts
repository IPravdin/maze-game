import {PositionType} from "../types/global";


export class PlayerData {
    position: PositionType
    collectedBonuses: number
    constructor(position: PositionType) {
        this.collectedBonuses = 0
        this.position = position
    }
}