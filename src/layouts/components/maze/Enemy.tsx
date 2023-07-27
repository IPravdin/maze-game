import React, {useEffect, useState} from "react";
import {PositionType} from "../../../types/global";
import {CurrMovCoordType, EnemyData} from "../../../data/EnemyData";
import {coordToPosition, objectsEqual, positionToCoord, returnRandomInt} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {MazeEnemy} from "../../../types/enemy";
import {enemiesActions} from "../../../store/slices/enemies";

type Props = {
    id: number,
    data: MazeEnemy
}

const Enemy = ({ id, data }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const maze = useSelector((state: RootState) => state.maze);
    const { speed, size} = useSelector((state: RootState) => state.enemies.params);
    const { cellSize } = maze.params;

    const [enemy, setEnemy] = useState(new EnemyData({
        ...data,
        currentPosition: coordToPosition(data.spawn, cellSize)
    }))

    // For npc movements
    useEffect(() => {
        if (speed) {
            const interval = setInterval(() => {
                setEnemy((prevState) => ({
                    ...prevState,
                    ...returnNewPosition(id, prevState)
                }))
            }, speed);
            return () => clearInterval(interval);
        }
    }, [speed])

    const returnNewPosition = (id: number, { currentPosition, spawn, movement, currMovCoord }: EnemyData): { currentPosition: PositionType, currMovCoord: CurrMovCoordType } => {
        const currentCoord = positionToCoord(currentPosition, cellSize);

        // ** Enemy on Spawn
        if (objectsEqual(spawn, currentCoord)) {
            const dirIndex = returnRandomInt(0, movement.length - 1);
            const newCoord = movement[dirIndex][0];
            dispatch(enemiesActions.recordCoord({id, newCoord}))
            return {
                currentPosition: coordToPosition(newCoord, cellSize),
                currMovCoord: { dirIndex, posInDir: 0, prevPosInDir: -1 }
            }
        }

        // ** Enemy on Direction
        if (isCurrMovCoordsDefined(currMovCoord)) {
            const { dirIndex, posInDir, prevPosInDir } = currMovCoord

            if (movement[dirIndex].length > 1 ) {
                if (posInDir === 0 && prevPosInDir < 0) {
                    const newCoord = movement[dirIndex][posInDir + 1];
                    dispatch(enemiesActions.recordCoord({id, newCoord}));
                    return {
                        currentPosition: coordToPosition(newCoord, cellSize),
                        currMovCoord: {dirIndex, posInDir: posInDir + 1, prevPosInDir: posInDir }
                    }
                } else if (posInDir === 1) {
                    const newCoord = movement[dirIndex][posInDir - 1];
                    dispatch(enemiesActions.recordCoord({id, newCoord}));
                    return {
                        currentPosition: coordToPosition(newCoord, cellSize),
                        currMovCoord: {dirIndex, posInDir: posInDir - 1, prevPosInDir: posInDir }
                    }
                } else if (posInDir === 0 && prevPosInDir > 0) {
                    const newCoord = spawn;
                    dispatch(enemiesActions.recordCoord({id, newCoord}));
                    return {
                        currentPosition: coordToPosition(newCoord, cellSize),
                        currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 }
                    }
                }
            } else {
                const newCoord = spawn;
                dispatch(enemiesActions.recordCoord({id, newCoord}));
                return {
                    currentPosition: coordToPosition(newCoord, cellSize),
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

    return <div className="enemy" style={{ ...size, left: enemy.currentPosition.left, top: enemy.currentPosition.top }}/>
}

export default Enemy