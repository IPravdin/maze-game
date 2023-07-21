import React from "react";
import { SizeType } from "../../../types/global";
import {CurrMovCoordType, EnemyData} from "../../../data/EnemyData";
import {coordToPosition, objectsEqual, positionToCoord, returnRandomInt} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {EnemySpeed} from "../../../enums/enemy-speed";
import {enemiesActions} from "../../../store/slices/enemies";

type Props = {
    id: number,
    speed: EnemySpeed,
    size: SizeType
}

const Enemy = ({ id, speed, size }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const maze = useSelector((state: RootState) => state.maze);
    const { cellSize } = maze.params;

    const enemies = useSelector((state: RootState) => state.enemies);
    const data = enemies.data[id];

    // For npc movements
    /*useEffect(() => {
        if (speed) {
            const interval = setInterval(() => {
                moveEnemy(id, data);
            }, speed);
            return () => clearInterval(interval);
        }
    }, [speed])*/

    const moveEnemy = (id: number, { currentPosition, spawn, movement, currMovCoord }: EnemyData): void => {
        const currentCoord = positionToCoord(currentPosition, cellSize);

        // ** Enemy on Spawn
        if (objectsEqual(spawn, currentCoord)) {
            const dirIndex = returnRandomInt(0, movement.length - 1);
            dispatch(enemiesActions.setNewPosition({id,
                currentPosition: coordToPosition(movement[dirIndex][0], cellSize),
                currMovCoord: { dirIndex, posInDir: 0, prevPosInDir: -1 }
            }))
        }

        // ** Enemy on Direction
        if (isCurrMovCoordsDefined(currMovCoord)) {
            const { dirIndex, posInDir, prevPosInDir } = currMovCoord

            if (movement[dirIndex].length > 1 ) {
                if (posInDir === 0 && prevPosInDir < 0) {
                    dispatch(enemiesActions.setNewPosition({id,
                        currentPosition: coordToPosition(movement[dirIndex][posInDir + 1], cellSize),
                        currMovCoord: {dirIndex, posInDir: posInDir + 1, prevPosInDir: posInDir }
                    }))
                } else if (posInDir === 1) {
                    dispatch(enemiesActions.setNewPosition({id,
                        currentPosition: coordToPosition(movement[dirIndex][posInDir - 1], cellSize),
                        currMovCoord: {dirIndex, posInDir: posInDir - 1, prevPosInDir: posInDir }
                    }))
                } else if (posInDir === 0 && prevPosInDir > 0) {
                    dispatch(enemiesActions.setNewPosition({id,
                        currentPosition: coordToPosition(spawn, cellSize),
                        currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 }
                    }))
                }
            } else {
                dispatch(enemiesActions.setNewPosition({id,
                    currentPosition: coordToPosition(spawn, cellSize),
                    currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 }
                }))
            }
        }
    }

    const isCurrMovCoordsDefined = (currMovCoord: CurrMovCoordType) => {
        const { dirIndex, posInDir } = currMovCoord;
        return dirIndex >= 0 && posInDir >= 0
    }

    return <div className="enemy" style={{ ...size, left: data.currentPosition.left, top: data.currentPosition.top }}/>
}

export default Enemy