import {MazeStructure} from "./MazeStructure";
import {MazeCell} from "../types/maze";


type MazeStructureProps = {
    mazeWidth: number,
    mazeHeight: number,
    bonusesOnMap: number
}

export class Maze extends MazeStructure {
    cellSize: number
    context: CanvasRenderingContext2D
    constructor(
        {mazeWidth, mazeHeight, bonusesOnMap}: MazeStructureProps,
        cellSize: number,
        context: CanvasRenderingContext2D
    ) {
        super(mazeWidth, mazeHeight, bonusesOnMap)

        this.cellSize = cellSize
        this.context = context
    }

    public draw = () => {
        this.clear()
        this.drawMap()
        this.drawBonuses()
        this.drawEnd()
    }

    protected drawMap = () => {
        const mazeMap = this.mazeMap
        for (let x = 0; x < mazeMap.length; x++) {
            for (let y = 0; y < mazeMap[x].length; y++) {
                this.drawCell(x, y, mazeMap[x][y]);
            }
        }
    }

    protected drawBonuses = () => {
        const mazeMap = this.mazeMap
        for (let x = 0; x < mazeMap.length; x++) {
            for (let y = 0; y < mazeMap[x].length; y++) {
                if (mazeMap[x][y].bonus.placed) {
                    const cellSize = this.cellSize
                    const xBonus = x * cellSize + cellSize / 2;
                    const yBonus = y * cellSize + cellSize / 2;
                    const radius = cellSize / 2 * 0.6

                    this.drawBonus(xBonus, yBonus, radius)
                }
            }
        }
    }

    protected drawEnd = () => {
        const context = this.context
        const cellSize = this.cellSize
        const coord = this.endCoord;
        const gridSize = 4;
        const fraction = cellSize / gridSize - 2;
        let colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 === 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                context.beginPath();
                context.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    context.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    context.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                context.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    protected clear = () => {
        const canvasWidth = this.cellSize * this.width
        const canvasHeight = this.cellSize * this.height
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    protected drawCell = (xCord: number, yCord: number, cell: MazeCell) => {
        const context = this.context
        const cellSize = this.cellSize
        const x = xCord * cellSize;
        const y = yCord * cellSize;


        if (!cell.walkable.top) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + cellSize, y);
            context.stroke();
        }
        if (!cell.walkable.bottom) {
            context.beginPath();
            context.moveTo(x, y + cellSize);
            context.lineTo(x + cellSize, y + cellSize);
            context.stroke();
        }
        if (!cell.walkable.right) {
            context.beginPath();
            context.moveTo(x + cellSize, y);
            context.lineTo(x + cellSize, y + cellSize);
            context.stroke();
        }
        if (!cell.walkable.left) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x, y + cellSize);
            context.stroke();
        }
    }

    protected drawBonus = (x: number, y: number, radius: number) => {
        const context = this.context

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = '#00FF00';
        context.fill()
    }
}