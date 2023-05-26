import React, {Fragment} from "react";
import {MazeCell} from "../../types/maze";
import Bonus from "./Bonus";
import {SizeType} from "../../types/global";

type Props = {
    mazeMap: MazeCell[][],
    cellSize: SizeType
}

const MazeBonuses = ({mazeMap, cellSize}: Props) => {
    return (
        <div>
            {mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                    const bonus = cell.bonus
                        if (bonus.placed && !bonus.collected) {
                            return <Bonus
                                key={`cell[${x}][${y}]`}
                                position={{
                                    left: x * cellSize.width,
                                    top: y * cellSize.height
                                }}
                                size={cellSize}
                            />
                        }
                        return <Fragment key={`cell[${x}][${y}]`}></Fragment>
                    }
                )
            })}
        </div>
    )
}

export default MazeBonuses