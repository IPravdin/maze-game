import {Coordinate, MazeCell} from "../types/maze";
import {Sprite} from "./Sprite";

export type MazeParamsProps = {
    mazeMap: MazeCell[][],
    startCoord: Coordinate,
    endCoord: Coordinate,
    cellSize: number
}

export class Character {
    readonly context: CanvasRenderingContext2D
    readonly mazeMap: MazeCell[][]
    readonly startCoord: Coordinate
    readonly endCoord: Coordinate
    readonly cellSize: number
    readonly halfCellSize: number
    readonly offsetLeft: number
    readonly offsetRight: number

    constructor(context: CanvasRenderingContext2D, { mazeMap, startCoord, endCoord, cellSize}: MazeParamsProps) {
        this.context = context
        this.mazeMap = mazeMap
        this.startCoord = startCoord
        this.endCoord = endCoord
        this.cellSize = cellSize
        this.halfCellSize = cellSize / 2
        this.offsetLeft = cellSize / 50
        this.offsetRight = cellSize / 25
    }

    protected drawSprite = (sprite: Sprite, coord: Coordinate) => {
        this.context.drawImage(
            sprite,
            0,
            0,
            sprite.width,
            sprite.height,
            coord.x * this.cellSize + this.offsetLeft,
            coord.y * this.cellSize + this.offsetLeft,
            this.cellSize - this.offsetRight,
            this.cellSize - this.offsetRight
        )
    }

    protected removeSprite = (coord: Coordinate) => {
        this.context.clearRect(
            coord.x * this.cellSize + this.offsetLeft,
            coord.y * this.cellSize + this.offsetLeft,
            this.cellSize - this.offsetRight,
            this.cellSize - this.offsetRight
        );
    }
}