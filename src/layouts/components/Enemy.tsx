import React, {useEffect, useState} from "react";
import {PlayerSizeType, PositionType, SizeType} from "../../types/global";
import {CurrMovCoordType, EnemyData} from "../../data/EnemyData";
import {MazeEnemy} from "../../types/enemy";
import {coordToPosition, objectsEqual, positionToCoord, returnRandomInt} from "../../helpers";

type Props = {
    cellSize: SizeType
    playerSize: PlayerSizeType
    data: MazeEnemy
}

const Enemy = ({cellSize, data, playerSize}: Props) => {
    const [enemy, setEnemy] = useState(new EnemyData({
        ...data,
        currentPosition: coordToPosition(data.spawn, cellSize)
    }))

    // For npc movements
    useEffect(() => {
        const interval = setInterval(() => {
            setEnemy((prevState) => ({
                ...prevState,
                ...returnNewPosition(prevState)
            }))
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const returnNewPosition = ({ currentPosition, spawn, movement, currMovCoord }: EnemyData): { currentPosition: PositionType, currMovCoord: CurrMovCoordType } => {
        const currentCoord = positionToCoord(currentPosition, cellSize);

        // ** Enemy on Spawn
        if (objectsEqual(spawn, currentCoord)) {
            const dirIndex = returnRandomInt(0, movement.length - 1);
            return {
                currentPosition: coordToPosition(movement[dirIndex][0], cellSize),
                currMovCoord: { dirIndex, posInDir: 0, prevPosInDir: -1 }
            }
        }

        // ** Enemy on Direction
        if (isCurrMovCoordsDefined(currMovCoord)) {
            const { dirIndex, posInDir, prevPosInDir } = currMovCoord

            if (movement[dirIndex].length > 1 ) {
                if (posInDir === 0 && prevPosInDir < 0) {
                    return {
                        currentPosition: coordToPosition(movement[dirIndex][posInDir + 1], cellSize),
                        currMovCoord: {dirIndex, posInDir: posInDir + 1, prevPosInDir: posInDir }
                    }
                } else if (posInDir === 1) {
                    return {
                        currentPosition: coordToPosition(movement[dirIndex][posInDir - 1], cellSize),
                        currMovCoord: {dirIndex, posInDir: posInDir - 1, prevPosInDir: posInDir }
                    }
                } else if (posInDir === 0 && prevPosInDir > 0) {
                    return {
                        currentPosition: coordToPosition(spawn, cellSize),
                        currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 }
                    }
                }
            } else {
                return {
                    currentPosition: coordToPosition(spawn, cellSize),
                    currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 }
                }
            }
        }

        // ** Else
        return { currentPosition, currMovCoord }
    }

    const isCurrMovCoordsDefined = (currMovCoord: CurrMovCoordType) => {
        const { dirIndex, posInDir } = currMovCoord;
        return dirIndex >= 0 && posInDir >= 0
    }

    return <div className="enemy" style={{ ...playerSize, left: enemy.currentPosition.left, top: enemy.currentPosition.top }}/>
}

export default Enemy