import React, {Fragment} from "react";
import Bonus from "./Bonus";
import getCreatureSize from "../../../store/slices/get-creature-size";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const MazeBonuses = () => {
    const maze = useSelector((state: RootState) => state.maze);
    const size = getCreatureSize(maze.params.cellSize);

    return (
        <div>
            {maze.data.mazeMap.map((columns, x) => {
                return columns.map((cell, y) => {
                    const bonus = cell.bonus
                        if (bonus.placed && !bonus.collected) {
                            return (
                                <Bonus
                                    key={`cell[${x}][${y}]`}
                                    position={{
                                        left: x * maze.params.cellSize.width,
                                        top: y * maze.params.cellSize.height
                                    }}
                                    size={size}
                                />
                            )
                        }
                        return <Fragment key={`cell[${x}][${y}]`}></Fragment>
                    }
                )
            })}
        </div>
    )
}

export default MazeBonuses