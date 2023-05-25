import {useState, KeyboardEvent, useRef, useEffect} from "react";
import Canvas from "./Canvas";
import {Maze} from "../../data/Maze";
import {Player} from "../../data/Player";
import {Console} from "inspector";

type Props = {
    keyPressed: string[]
}

const MazeCanvas = ({keyPressed}: Props) => {
    // add calc(100% - 3rem) later for the width and height
    const canvasWidth = 900
    const canvasHeight = 900
    const mazeWidth = 10
    const mazeHeight = 10
    const bonusesOnMap = 3
    const enemiesOnMap = 1
    const cellSize = canvasWidth / mazeWidth

    console.log(keyPressed[keyPressed.length - 1])

    const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
        const maze = new Maze({mazeWidth, mazeHeight, bonusesOnMap: bonusesOnMap}, cellSize, canvasContext)
        maze.draw()

        const {mazeMap, startCoord, endCoord} = maze
        const player = new Player(canvasContext, {mazeMap, startCoord, endCoord, cellSize})
        player.drawSprite(startCoord)


        // player

        // for loop

        // enemy

    }

    return <Canvas width={canvasWidth} height={canvasHeight} draw={handleDraw}/>
}

export default MazeCanvas