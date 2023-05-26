import React from "react";
import {MazeCell} from "../../types/maze";

type Props = {
    mazeMap: MazeCell[][],
    cellSize: {height: number, width: number}
}

const Bonuses = ({mazeMap, cellSize}: Props) => {
    return (
        <div>
            {mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                    const bonus = mazeMap[x][y].bonus
                        if (bonus.placed && !bonus.collected) {
                            return <div className='bonus' style={{
                                left: x * cellSize.width,
                                top: y * cellSize.height,
                                width: cellSize.width,
                                height: cellSize.height,
                            }}/>
                        }
                    }
                )
            })}
        </div>
    )
}

export default Bonuses