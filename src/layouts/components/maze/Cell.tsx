import React, {ReactNode} from "react";
import {CoordinateType, MazeCell} from "../../../types/maze";
import {SizeType} from "../../../types/global";

type Props = {
    coord: CoordinateType
    cell: MazeCell,
    cellSize: SizeType,
    children?: ReactNode
}
const Cell = ({coord, cellSize, cell, children}: Props) => {
    const {top, bottom, left, right} = cell.walkable

    let backgroundImage: string = "url('/cells/cell.png')";
    if (!top) {
        backgroundImage = "url('/cells/border-t.png'), " + backgroundImage;
    }
    if (!bottom) {
        backgroundImage = "url('/cells/border-b.png'), " + backgroundImage;
    }
    if (!left) {
        backgroundImage = "url('/cells/border-l.png'), " + backgroundImage;
    }
    if (!right) {
        backgroundImage = "url('/cells/border-r.png'), " + backgroundImage;
    }

    return (
        <div
            className="absolute box-border bg-cover bg-no-repeat"
            style={{
                left: coord.x * cellSize.width,
                top: coord.y * cellSize.height,
                width: cellSize.width,
                height: cellSize.height,
                backgroundImage
            }}
        >
            {children}
        </div>
    )
}

export default Cell