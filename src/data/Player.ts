import {Character, MazeParamsProps} from "./Character";
import {Coordinate, MazeCell} from "../types/maze";
import {Sprite} from "./Sprite";


export class Player extends Character {
    /*healthBar: number
    collectedBonuses: number*/
    locationCord: Coordinate

    constructor(context: CanvasRenderingContext2D, {mazeMap, startCoord, endCoord, cellSize}: MazeParamsProps) {
        super(context, {mazeMap, startCoord, endCoord, cellSize});
        this.locationCord = startCoord

    }

    /*protected drawSprite = (sprite: Sprite, coord: Coordinate) => {
        super.drawSprite(sprite, coord)

        /!*if (coord.x === this.endCoord.x && coord.y === this.endCoord.y) {
            onComplete(moves);
            player.unbindKeyDown();
        }*!/
    }*/

    // collectBonus
}