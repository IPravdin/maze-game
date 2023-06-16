import React from "react";
import {CoordinateType, MazeCell} from "../../types/maze";
import {SizeType} from "../../types/global";

type Props = {
    coord: CoordinateType
    cell: MazeCell,
    cellSize: SizeType
}
const Cell = ({coord, cellSize, cell}: Props) => {
    const {top, bottom, left, right} = cell.walkable

    const borderWidth = 2
    const borderProps = `${borderWidth}px solid white`

    return <div
        className="cell"
        style={{
            left: coord.x * cellSize.width,
            top: coord.y * cellSize.height,
            width: cellSize.width ,
            height: cellSize.height ,
            borderRight: right ? '' : borderProps,
            borderLeft: left ? '' : borderProps,
            borderTop: top ? '' : borderProps,
            borderBottom: bottom ? '': borderProps
        }}
    />
}

export default Cell