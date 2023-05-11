import Canvas from "./Canvas";
import {Maze} from "../../data/Maze";

const MazeCanvas = () => {
    // add calc(100% - 3rem) later for the width and height
    const canvasWidth = 900
    const canvasHeight = 900
    const mazeWidth = 10
    const mazeHeight = 10
    const bonusesOnMap = 3
    const enemiesOnMap = 1
    const cellSize = canvasWidth / mazeWidth

    const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
        const maze = new Maze({mazeWidth, mazeHeight, bonusesOnMap: bonusesOnMap}, cellSize, canvasContext)
        maze.draw()

        const {mazeMap, startCoord, endCoord} = maze
        // TODO: change for Player and Enemy
        /*const character = new Character(canvasContext, {mazeMap, startCoord, endCoord, cellSize})*/

        // player

        // for loop

        // enemy

    }

    return <Canvas width={canvasWidth} height={canvasHeight} draw={handleDraw}/>
}

export default MazeCanvas