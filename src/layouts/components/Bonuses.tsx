import React from "react";
import {MazeCell} from "../../types/maze";

type Props = {
    mazeMap: MazeCell[][],
    cellSize: {h: number, w: number}
}

const Bonuses = ({mazeMap, cellSize}: Props) => {
    return (
        <div>
            {mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                        if (mazeMap[x][y].bonus.placed) {
                            return <div className='bonus' style={{
                                left: x * cellSize.w,
                                top: y * cellSize.h,
                                width: cellSize.w ,
                                height: cellSize.h ,
                            }}/>
                        }
                    }
                )
            })}
        </div>
    )
}

export default Bonuses