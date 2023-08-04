import React, {useEffect, useState} from "react";
import { CoordinateType, OrientationType } from "../../../types/maze";
import {positionToCoord} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {gameplayActions} from "../../../store/slices/gameplay";
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
    const gameplay = useSelector((state: RootState) => state.gameplay);
    const player = useSelector((state: RootState) => state.player);
    const maze = useSelector((state: RootState) => state.maze);

    const [sprite, setSprite] = useState("url('/player/player-b.png')");

    useEffect(() => {
        const { playerMoveDir } = gameplay;

        if (!playerMoveDir) return;

        if (playerMoveDir === "ArrowRight" || playerMoveDir === "KeyD") {
            movePlayer('right');
            setSprite("url('/player/player-r.png')");
        }
        if (playerMoveDir === "ArrowLeft" || playerMoveDir === "KeyA") {
            movePlayer('left');
            setSprite("url('/player/player-l.png')");
        }
        if (playerMoveDir === "ArrowDown" || playerMoveDir === "KeyS") {
            movePlayer('bottom');
            setSprite("url('/player/player-b.png')");
        }
        if (playerMoveDir === "ArrowUp" || playerMoveDir === "KeyW") {
            movePlayer('top');
            setSprite("url('/player/player-t.png')");
        }

        dispatch(gameplayActions.playerMove(null));
    }, [gameplay.playerMoveDir]);

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
        if (newCell.startEnd.end) {
            dispatch(gameplayActions.froze('won'))
        }
    }

    if (!player.data) {
        return <Spinner />;
    }

    return (
        <div
            className="absolute z-50 bg-cover bg-no-repeat"
            style={{
                ...player.params.playerSize,
                top: player.data.currentPosition.top,
                left: player.data.currentPosition.left,
                backgroundImage: player.data.alive ? sprite : "url('/player/player-dead.png')"
            }}
        />
    );
}

export default Player