import Canvas from "./Canvas";
import {Maze} from "../../data/Maze";


const MazeCanvas = () => {
    const canvasWidth = 900
    const canvasHeight = 900
    const mazeWidth = 10
    const mazeHeight = 10
    const bonusesOnMap = 3
    const enemiesOnMap = 1
    const cellSize = canvasWidth / mazeWidth

    const draw = (canvasContext: CanvasRenderingContext2D) => {
        const maze = new Maze({mazeWidth, mazeHeight, bonusesOnMap: bonusesOnMap}, cellSize, canvasContext)

        maze.draw()
    }

    return <Canvas width={canvasWidth} height={canvasHeight} draw={draw}/>
}

export default MazeCanvas