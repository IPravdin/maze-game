import React, { Dispatch, SetStateAction, useEffect } from "react";
import { PlayerSizeType, PositionType, SizeType } from "../../../types/global";
import { CoordinateType, OrientationType } from "../../../types/maze";
import { PlayerData } from "../../../data/PlayerData";
import { positionToCoord } from "../../../helpers";
import { PlayerMoveKeys } from "../../../types/player";
import { MazeData } from "../../../data/MazeData";

interface Props {
    playerMove: PlayerMoveKeys | null,
    setPlayerMove: Dispatch<SetStateAction<PlayerMoveKeys | null>>,
    playerSize: PlayerSizeType,
    setPlayer: Dispatch<SetStateAction<PlayerData>>,
    currentPosition: PositionType,
    cellSize: SizeType,
    mazeStructure: MazeData,
    handleFinishOpen: () => void
}
const Player = ({playerSize, currentPosition, playerMove, setPlayerMove, setPlayer, cellSize, mazeStructure, handleFinishOpen}: Props) => {

    useEffect(() => {
        if (!playerMove) return

        if (playerMove === "ArrowRight" || playerMove === "KeyD") {
            setPlayer((prevState) => returnUpdatedPlayer('right', prevState));
        }
        if (playerMove === "ArrowLeft" || playerMove === "KeyA") {
            setPlayer((prevState) => returnUpdatedPlayer('left', prevState));
        }
        if (playerMove === "ArrowDown" || playerMove === "KeyS") {
            setPlayer((prevState) => returnUpdatedPlayer('bottom', prevState));
        }
        if (playerMove === "ArrowUp" || playerMove === "KeyW") {
            setPlayer((prevState) => returnUpdatedPlayer('top', prevState));
        }

        setPlayerMove(null)
    }, [playerMove])

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
            handleFinishOpen()
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

    return (
        <div
            className="player"
            style={{ ...playerSize, top: currentPosition.top, left: currentPosition.left }}
        />
    )
}

export default Player