import React from "react";
import Enemy from "./Enemy";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const Enemies = () => {
    const enemies = useSelector((state: RootState) => state.enemies);

    return (
        <div>
            {enemies.data.map((enemy, index) =>
                <Enemy
                    key={`enemy[${enemy.spawn.x}][${enemy.spawn.y}]`}
                    id={index}
                    speed={enemies.params.speed}
                    size={enemies.params.size}
                />
            )}
        </div>
    )
}

export default Enemies