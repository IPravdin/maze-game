import Enemies from "../layouts/components/maze/Enemies";
import Player from "../layouts/components/maze/Player";
import React, { useEffect, useRef, useState} from "react";
import {PlayerData} from "../data/PlayerData";
import {coordToPosition} from "../helpers";
import {PlayerSizeType} from "../types/global";
import {HudData} from "../data/HudData";
import {MazeData} from "../data/MazeData";
import {EnemySpeed} from "../enums/enemy-speed";
import GameStateDialog from "../layouts/components/game/GameStateDialog";
import Hud from "../layouts/components/game/Hud";
import Maze from "../layouts/components/game/Maze";
import {PlayerMoveKeys} from "../types/player";

// TODO: Formula which will allow to determine how many enemies and bonuses could be without App crash
const BONUSES = 1
const ENEMIES = 1
const MAZE_WIDTH = 1000
const MAZE_CELL_WIDTH = 10
const MAZE_HEIGHT = 200
const MAZE_CELL_HEIGHT = 2

export const ENEMY_SPEED: EnemySpeed = EnemySpeed.slow

const cellSize = {
    height: MAZE_WIDTH / MAZE_CELL_WIDTH,
    width: MAZE_HEIGHT / MAZE_CELL_HEIGHT
}

const mazeStructure = new MazeData({width: MAZE_CELL_WIDTH, height: MAZE_CELL_HEIGHT}, BONUSES, ENEMIES)
const initialPlayerData = new PlayerData(coordToPosition(mazeStructure.startCoord, cellSize))

const hud = new HudData({width: MAZE_WIDTH, height: 100}, BONUSES)

const playerSize: PlayerSizeType = {
    width: cellSize.width - 15,
    height: cellSize.width - 15,
    borderWidth: 2.5,
    margin: 5,
}

const Game = () => {
    const divRef = useRef<HTMLDivElement>(null)

    const [player, setPlayer] = useState(initialPlayerData)
    const [playerMove, setPlayerMove] = useState<PlayerMoveKeys | null>(null)

    const [enemySpeed, setEnemySpeed] = useState<EnemySpeed>(ENEMY_SPEED)

    const [openPause, setOpenPause] = useState(false)
    const [openFinish, setOpenFinish] = useState(false)

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef])

    const keyDownListener = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (
            "ArrowRight" || "KeyD"
            || "ArrowLeft" || "KeyA"
            || "ArrowDown" || "KeyS"
            || "ArrowUp" || "KeyW"
        ) {
            setPlayerMove(event.code as PlayerMoveKeys)
        }

        if (event.code === "Escape") {
            setOpenPause(true)
        }
    };

    return (
        <div className="w-full h-full" onKeyDown={keyDownListener} tabIndex={0} ref={divRef}>
            <Hud
                bonuses={player.collectedBonuses}
                cellSize={cellSize}
                hudSize={hud.size}
            />
            <Maze
                mazeMap={mazeStructure.mazeMap}
                finishCoord={mazeStructure.endCoord}
                cellSize={cellSize}
                size={{
                    width: MAZE_WIDTH,
                    height: MAZE_HEIGHT
                }}
                enemies={
                    <Enemies
                        enemiesData={mazeStructure.enemies}
                        cellSize={cellSize}
                        enemySize={playerSize}
                        enemySpeed={enemySpeed}
                    />
                }
                player={
                    <Player
                        currentPosition={player.currentPosition}
                        playerMove={playerMove}
                        setPlayerMove={setPlayerMove}
                        playerSize={playerSize}
                        setPlayer={setPlayer}
                        cellSize={cellSize}
                        mazeStructure={mazeStructure}
                        handleFinishOpen={() => setOpenFinish(true)}
                    />
                }
            />
            <GameStateDialog
                id="finish_modal"
                title="Congrats"
                text="That's fast"
                open={openFinish}
                onOpen={() => setEnemySpeed(EnemySpeed.stop)}
                onClose={() => {
                    setEnemySpeed(ENEMY_SPEED)
                    setOpenFinish(false)
                }}
            />
            <GameStateDialog
                id="pause_modal"
                title="Pause"
                text="Close modal to continue"
                open={openPause}
                onOpen={() => setEnemySpeed(EnemySpeed.stop)}
                onClose={() => {
                    setEnemySpeed(ENEMY_SPEED)
                    setOpenPause(false)
                }}
            />
        </div>
    )
}

export default Game;