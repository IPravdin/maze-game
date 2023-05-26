import Cell from "./Cell";
import React from "react";
import {MazeCell} from "../../types/maze";

type Props = {
    mazeMap: MazeCell[][],
    cellSize: {h: number, w: number}
}
const Maze = ({mazeMap, cellSize}: Props) => {
    return (
        <div>
            {mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                        return <Cell key={`cell[${x}][${y}]`} x={x} y={y} cell={cell} cellSize={cellSize}/>
                    }
                )
            })}
        </div>
    )
}

export default Maze