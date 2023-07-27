import React from "react";
import Enemy from "./Enemy";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const Enemies = () => {
    const mazeEnemies = useSelector((state: RootState) => state.maze.data.enemies);

    return (
        <div>
            {mazeEnemies.map((enemy, index) =>
                <Enemy
                    key={`enemy[${enemy.spawn.x}][${enemy.spawn.y}]`}
                    id={index}
                    data={enemy}
                />
            )}
        </div>
    )
}

export default Enemies