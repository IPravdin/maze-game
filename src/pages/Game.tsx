import PlayerBonuses from "../layouts/components/PlayerBonuses";
import Enemies from "../layouts/components/Enemies";
import Player from "../layouts/components/Player";
import Maze from "../layouts/components/Maze";
import MazeBonuses from "../layouts/components/MazeBonuses";
import Finish from "../layouts/components/Finish";
import Dialog from "../layouts/components/Dialog";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {CoordinateType, OrientationType} from "../types/maze";
import {PlayerData} from "../data/PlayerData";
import {coordToPosition, positionToCoord} from "../helpers";
import {PlayerSizeType, PositionType} from "../types/global";
import {HudData} from "../data/HudData";
import {MazeData} from "../data/MazeData";

// TODO: Formula which will allow to determine how many enemies and bonuses could be without App crash
const BONUSES = 1
const ENEMIES = 1
const MAZE_WIDTH = 1000
const MAZE_CELL_WIDTH = 10
const MAZE_HEIGHT = 200
const MAZE_CELL_HEIGHT = 2

// in ms
export const ENEMY_MOVE_INTERVAL = 1000

const cellSize = {
    height: MAZE_WIDTH / MAZE_CELL_WIDTH,
    width: MAZE_HEIGHT / MAZE_CELL_HEIGHT
}

const mazeStructure = new MazeData({width: MAZE_CELL_WIDTH, height: MAZE_CELL_HEIGHT}, BONUSES, ENEMIES)
const playerData = new PlayerData(coordToPosition(mazeStructure.startCoord, cellSize))
const hud = new HudData({width: MAZE_WIDTH, height: 100}, BONUSES)

const playerSize: PlayerSizeType = {
    width: cellSize.width - 15,
    height: cellSize.width - 15,
    borderWidth: 2.5,
    margin: 5,
}

const Game = () => {
    const divRef = useRef<HTMLDivElement>(null)

    const [player, setPlayer] = useState(playerData)
    const [finished, setFinished] = useState(false)

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef])

    const returnUpdatedPlayer = (mode: OrientationType, prevState: PlayerData): PlayerData => {
        const { currentPosition } = prevState;
        const currentCoord: CoordinateType = positionToCoord(currentPosition, cellSize);

        // ** Is Cell walkable
        if(!mazeStructure.mazeMap[currentCoord.x][currentCoord.y].walkable[mode]) return prevState

        let newPosition: PositionType = {left: 0, top: 0}

        switch (mode) {
            case 'left':
                newPosition.left = prevState.currentPosition.left - cellSize.width
                newPosition.top = currentPosition.top
                break;
            case 'right':
                newPosition.left = prevState.currentPosition.left + cellSize.width
                newPosition.top = currentPosition.top
                break;
            case 'top':
                newPosition.left = currentPosition.left
                newPosition.top = prevState.currentPosition.top - cellSize.height
                break;
            case 'bottom':
                newPosition.left = currentPosition.left
                newPosition.top = prevState.currentPosition.top + cellSize.height
                break;
        }

        // ** Bonus collect
        const newCoord= positionToCoord(newPosition, cellSize)
        const newCell = mazeStructure.mazeMap[newCoord.x][newCoord.y]

        let collectedBonuses = prevState.collectedBonuses

        if (newCell.bonus.placed && !newCell.bonus.collected) {
            collectedBonuses++
            newCell.bonus.collected = true
        }

        // ** Register finish
        if (newCell.startEnd.end) {
            setFinished(true)
            // @ts-ignore
            window["finish_modal"].showModal()
        }

        return {
            ...prevState,
            stepsWalked: ++prevState.stepsWalked,
            collectedBonuses: collectedBonuses,
            currentPosition: {
                left: newPosition.left,
                top: newPosition.top
            }
        }
    }

    const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (event.code === "ArrowRight" || event.code === "KeyD") {
            setPlayer((prevState) => returnUpdatedPlayer('right', prevState));
        }
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            setPlayer((prevState) => returnUpdatedPlayer('left', prevState));
        }
        if (event.code === "ArrowDown" || event.code === "KeyS") {
            setPlayer((prevState) => returnUpdatedPlayer('bottom', prevState));
        }
        if (event.code === "ArrowUp" || event.code === "KeyW") {
            setPlayer((prevState) => returnUpdatedPlayer('top', prevState));
        }
    };
    //TODO: pause mode with ?pause param in router

    return (
        <Fragment>
            <div className="w-full h-full" onKeyDown={keyDownEvent} tabIndex={0} ref={divRef}>
                <div className="container" style={{ width: hud.size.width, height: hud.size.height }}>
                    <PlayerBonuses bonuses={player.collectedBonuses} cellSize={hud.cellSize}/>
                </div>
                <div className="container" style={{ width: MAZE_WIDTH, height: MAZE_HEIGHT }}>
                    <Enemies enemiesData={mazeStructure.enemies} cellSize={cellSize} playerSize={playerSize}/>
                    <Player position={player.currentPosition} playerSize={playerSize}/>
                    <Maze mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                    <MazeBonuses mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                    <Finish coord={mazeStructure.endCoord} cellSize={cellSize}/>
                </div>
            </div>
            <Dialog id="finish_modal" title="Congrats" text="That's fast"/>
        </Fragment>
    )
}

export default Game