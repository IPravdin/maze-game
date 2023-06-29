import Cell from "./Cell";
import React from "react";
import {MazeCell} from "../../../types/maze";
import {SizeType} from "../../../types/global";

type Props = {
    mazeMap: MazeCell[][],
    cellSize: SizeType
}
const Maze = ({mazeMap, cellSize}: Props) => {
    return (
        <div>
            {mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                        return <Cell key={`cell[${x}][${y}]`} coord={{x, y}} cell={cell} cellSize={cellSize}/>
                    }
                )
            })}
        </div>
    )
}

export default Maze