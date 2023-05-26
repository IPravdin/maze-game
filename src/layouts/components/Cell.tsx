import React from "react";
import {MazeCell} from "../../types/maze";

type Props = {
    x: number,
    y: number,
    cell: MazeCell,
    cellSize: {
        h: number,
        w: number
    }
}
const Cell = ({x, y, cellSize, cell}: Props) => {
    const {top, bottom, left, right} = cell.walkable

    const borderWidth = 2
    const borderProps = `${borderWidth}px solid white`

    return <div
        className="cell"
        style={{
            left: x * cellSize.w,
            top: y * cellSize.h,
            width: cellSize.w ,
            height: cellSize.h ,
            borderRight: right ? '' : borderProps,
            borderLeft: left ? '' : borderProps,
            borderTop: top ? '' : borderProps,
            borderBottom: bottom ? '': borderProps
        }}
    />
}

export default Cell