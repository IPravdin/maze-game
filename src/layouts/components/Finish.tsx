import React from "react";
import {SizeType} from "../../types/global";
import {Coordinate} from "../../types/maze";

type Props = {
    coord: Coordinate
    cellSize: SizeType
}
const Finish = ({coord, cellSize}: Props) => {
    return (
        <div className="finish" style={{
            width: cellSize.width,
            height: cellSize.height,
            left: coord.x * cellSize.width,
            top: coord.y * cellSize.height
        }}/>
    )
}

export default Finish