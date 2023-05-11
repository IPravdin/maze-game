import {Character, MazeParamsProps} from "./Character";
import {Coordinate} from "../types/maze";


export class Enemy extends Character {
    locationCord: Coordinate

    constructor(context: CanvasRenderingContext2D, {mazeMap, startCoord, endCoord, cellSize}: MazeParamsProps) {
        super(context, {mazeMap, startCoord, endCoord, cellSize});

        this.locationCord = endCoord
        /*this.locationCord = this.returnSpawnSpot()*/
    }

    /*protected returnSpawnSpot = () => {
        const spawn: Coordinate
        return spawn
        // check whether other enemy is not occupied it
    }*/
}