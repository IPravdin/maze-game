import React, {useEffect, useState} from "react";
import { PositionType } from '../../utils/types/global';
import {CurrMovCoordType, EnemyData} from "../../data/EnemyData";
import {coordToPosition, objectsEqual, positionToCoord, returnRandomInt} from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {MazeEnemy} from "../../utils/types/enemy";
import {enemiesActions} from "../../store/slices/enemies";
import EnemyMovementCells from './EnemyMovementCells';

type Props = {
    id: number,
    data: MazeEnemy
}

const Enemy = ({ id, data }: Props) => {
    const dispatch = useDispatch();
    const maze = useSelector((state: RootState) => state.maze);
    const { speed, size} = useSelector((state: RootState) => state.enemies.params);
    const { cellSize } = maze.params;
    
    const [enemy, setEnemy] = useState(new EnemyData({
        ...data,
        currentPosition: coordToPosition(data.spawn, cellSize)
    }))
    
    // Redefines enemy after component mount to avoid walk-though-walls bug
    useEffect(() => {
        setEnemy(new EnemyData({
            ...data,
            currentPosition: coordToPosition(data.spawn, cellSize)
        }))
    }, [data]);
    
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
    }, [speed, cellSize])
    
    const returnNewPosition = (id: number, { currentPosition, spawn, movement, currMovCoord, sprite }: EnemyData): { currentPosition: PositionType, currMovCoord: CurrMovCoordType, sprite: string } => {
        const currentCoord = positionToCoord(currentPosition, cellSize);

        // ** Enemy on Spawn
        if (objectsEqual(spawn, currentCoord)) {
            const dirIndex = returnRandomInt(0, movement.length - 1);
            const newCoord = movement[dirIndex][0];
            const newPos = coordToPosition(newCoord, cellSize);
            dispatch(enemiesActions.recordCoord({id, newCoord}));
            return {
                currentPosition: newPos,
                currMovCoord: { dirIndex, posInDir: 0, prevPosInDir: -1 },
                sprite: returnNewSprite(currentPosition, newPos, sprite)
            }
        }

        // ** Enemy on Direction
        if (isCurrMovCoordsDefined(currMovCoord)) {
            const { dirIndex, posInDir, prevPosInDir } = currMovCoord;
            
            if (movement[dirIndex].length > 1 ) {
                if (posInDir === 0 && prevPosInDir < 0) {
                    const newCoord = movement[dirIndex][posInDir + 1];
                    const newPos = coordToPosition(newCoord, cellSize);
                    dispatch(enemiesActions.recordCoord({id, newCoord}));
                    return {
                        currentPosition: newPos,
                        currMovCoord: {dirIndex, posInDir: posInDir + 1, prevPosInDir: posInDir },
                        sprite: returnNewSprite(currentPosition, newPos, sprite)
                    }
                } else if (posInDir === 1) {
                    const newCoord = movement[dirIndex][posInDir - 1];
                    const newPos = coordToPosition(newCoord, cellSize);
                    dispatch(enemiesActions.recordCoord({id, newCoord}));
                    return {
                        currentPosition: newPos,
                        currMovCoord: {dirIndex, posInDir: posInDir - 1, prevPosInDir: posInDir },
                        sprite: returnNewSprite(currentPosition, newPos, sprite)
                    }
                } else if (posInDir === 0 && prevPosInDir > 0) {
                    const newCoord = spawn;
                    const newPos = coordToPosition(newCoord, cellSize);
                    dispatch(enemiesActions.recordCoord({id, newCoord}));
                    return {
                        currentPosition: newPos,
                        currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 },
                        sprite: returnNewSprite(currentPosition, newPos, sprite)
                    }
                }
            } else {
                const newCoord = spawn;
                const newPos = coordToPosition(newCoord, cellSize);
                dispatch(enemiesActions.recordCoord({id, newCoord}));
                return {
                    currentPosition: newPos,
                    currMovCoord: { dirIndex: -1, posInDir: -1, prevPosInDir: -1 },
                    sprite: returnNewSprite(currentPosition, newPos, sprite)
                }
            }
        }

        // ** Else
        return { currentPosition, currMovCoord, sprite };
    }

    const returnNewSprite = (prevPos: PositionType, currPos: PositionType, oldSprite: string) => {
        if (prevPos.left !== currPos.left) {
            const diff = prevPos.left - currPos.left;

            if (diff > 0) {
                return "url('/enemy/enemy-l.png')"
            } else {
                return "url('/enemy/enemy-r.png')"
            }
        }
        if (prevPos.top !== currPos.top) {
            const diff = prevPos.top - currPos.top;

            if (diff > 0) {
                return "url('/enemy/enemy-t.png')"
            } else {
                return "url('/enemy/enemy-b.png')"
            }
        }

        return oldSprite;
    }

    const isCurrMovCoordsDefined = (currMovCoord: CurrMovCoordType) => {
        const { dirIndex, posInDir } = currMovCoord;
        return dirIndex >= 0 && posInDir >= 0
    }

    return (
        <div>
            <EnemyMovementCells id={id} data={enemy.movement} spawn={enemy.spawn} />
            <div
                className="absolute z-20 bg-cover bg-no-repeat bg-[url('/src/assets/default-view/enemy-b.png')]"
                style={{
                    ...size,
                    left: enemy.currentPosition.left,
                    top: enemy.currentPosition.top,
                    backgroundImage: enemy.sprite
                }}
            />
        </div>
    );
}

export default Enemy