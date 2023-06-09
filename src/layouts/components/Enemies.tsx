import React, {Fragment} from "react";
import {MazeCell} from "../../types/maze";
import {PlayerSizeType, SizeType} from "../../types/global";
import Enemy from "./Enemy";

type Props = {
    mazeMap: MazeCell[][]
    cellSize: SizeType
    playerSize: PlayerSizeType
}

const Enemies = ({mazeMap, cellSize, playerSize}: Props) => {
    return (
        <div>
            {mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                    if (cell.enemy.spawn) {
                        return <Enemy key={`enemy[${x}][${y}]`} coord={{x, y}} cellSize={cellSize} playerSize={playerSize}/>
                    } else if (cell.enemy.movement) {
                        return <div className='cell' style={{ ...playerSize, left: x * cellSize.width, top: y * cellSize.height, backgroundColor: "pink" }}/>
                    } else {
                        return <Fragment key={`enemy[${x}][${y}]`}/>
                    }
                })
            })}
        </div>
    )
}

export default Enemies