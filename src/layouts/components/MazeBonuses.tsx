import React, {Fragment} from "react";
import {MazeCell} from "../../types/maze";
import Bonus from "./Bonus";

type Props = {
    mazeMap: MazeCell[][],
    cellSize: {height: number, width: number}
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
                                left={x * cellSize.width}
                                top={y * cellSize.height}
                                width={cellSize.width}
                                height={cellSize.height}
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