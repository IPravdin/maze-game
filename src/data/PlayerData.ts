import {PositionType} from "../utils/types/global";
import {CreatureData} from "./CreatureData";

export class PlayerData extends CreatureData {
    collectedBonuses: number
    stepsWalked: number
    constructor(position: PositionType) {
        super(position)

        this.collectedBonuses = 0;
        this.stepsWalked = 0;
    }

    toJson = () => {
        return {
            collectedBonuses: this.collectedBonuses,
            stepsWalked: this.stepsWalked,
            currentPosition: this.currentPosition,
            alive: this.alive,
        }
    }
}