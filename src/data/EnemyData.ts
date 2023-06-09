import {PositionType} from "../types/global";
import {CreatureData} from "./CreatureData";


export class EnemyData extends CreatureData{
    constructor(position: PositionType) {
        super(position)
    }
}