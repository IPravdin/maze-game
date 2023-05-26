import {PositionType} from "../types/global";


export class PlayerData {
    position: PositionType
    collectedBonuses: number
    stepsWalked: number
    constructor(position: PositionType) {
        this.position = position
        this.collectedBonuses = 0
        this.stepsWalked = 0
    }
}