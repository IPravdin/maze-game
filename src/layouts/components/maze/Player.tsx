import React, { useEffect } from "react";
import { CoordinateType, OrientationType } from "../../../types/maze";
import { positionToCoord } from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {keyboardActions} from "../../../store/slices/keyboard";
import {playerActions} from "../../../store/slices/player";
import Spinner from "../Spinner";
import {mazeActions} from "../../../store/slices/maze";
import {PositionType, SizeType} from "../../../types/global";

const returnNewPosition = (mode: OrientationType, currentPosition: PositionType, cellSize: SizeType) => {
    let newPosition: PositionType = {left: 0, top: 0};

    switch (mode) {
        case 'left':
            newPosition.left = currentPosition.left - cellSize.width
            newPosition.top = currentPosition.top
            break;
        case 'right':
            newPosition.left = currentPosition.left + cellSize.width
            newPosition.top = currentPosition.top
            break;
        case 'top':
            newPosition.left = currentPosition.left
            newPosition.top = currentPosition.top - cellSize.height
            break;
        case 'bottom':
            newPosition.left = currentPosition.left
            newPosition.top = currentPosition.top + cellSize.height
            break;
    }

    return newPosition;
}

const Player = () => {
    const dispatch: AppDispatch = useDispatch();
    const keyboard = useSelector((state: RootState) => state.keyboard);
    const player = useSelector((state: RootState) => state.player);
    const maze = useSelector((state: RootState) => state.maze);

    useEffect(() => {
        const { playerMoveDir } = keyboard;

        if (!playerMoveDir) return;

        if (playerMoveDir === "ArrowRight" || playerMoveDir === "KeyD") {
            movePlayer('right');
        }
        if (playerMoveDir === "ArrowLeft" || playerMoveDir === "KeyA") {
            movePlayer('left');
        }
        if (playerMoveDir === "ArrowDown" || playerMoveDir === "KeyS") {
            movePlayer('bottom');
        }
        if (playerMoveDir === "ArrowUp" || playerMoveDir === "KeyW") {
            movePlayer('top');
        }

        dispatch(keyboardActions.playerMove(null));
    }, [keyboard.playerMoveDir]);

    const movePlayer = (mode: OrientationType): void => {
        if (!player.data) return;

        const { currentPosition } = player.data;
        const { cellSize } = maze.params;
        const currentCoord: CoordinateType = positionToCoord(currentPosition, cellSize);

        // ** Is Cell walkable
        if (!maze.data.mazeMap[currentCoord.x][currentCoord.y].walkable[mode]) return;

        const newPosition = returnNewPosition(mode, currentPosition, cellSize);
        dispatch(playerActions.move(newPosition));
        dispatch(playerActions.recordStep());

        // ** Bonus collect
        const newCoord= positionToCoord(newPosition, cellSize);
        const newCell = maze.data.mazeMap[newCoord.x][newCoord.y];

        if (newCell.bonus.placed && !newCell.bonus.collected) {
            dispatch(playerActions.collectBonus());
            dispatch(mazeActions.setBonusCollected(newCoord));
        }

        // ** Register finish
       /* if (newCell.startEnd.end) {
            handleFinishOpen()
        }*/
    }

    if (!player.data) {
        return <Spinner />
    }

    return (
        <div
            className="player"
            style={{ ...player.params.playerSize, top: player.data.currentPosition.top, left: player.data.currentPosition.left }}
        />
    )
}

export default Player