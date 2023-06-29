import React from "react";
import {PlayerSizeType, SizeType} from "../../../types/global";
import Enemy from "./Enemy";
import {MazeEnemy} from "../../../types/enemy";

type Props = {
    cellSize: SizeType
    enemySize: PlayerSizeType
    enemiesData: MazeEnemy[]
    enemySpeed: number
}

const Enemies = ({ enemiesData, cellSize, enemySize, enemySpeed }: Props) => {
    return (
        <div>
            {enemiesData.map((enemy) =>
                <Enemy
                    key={`enemy[${enemy.spawn.x}][${enemy.spawn.y}]`}
                    data={enemy}
                    cellSize={cellSize}
                    enemySize={enemySize}
                    enemySpeed={enemySpeed}
                />
            )}
        </div>
    )
}

export default Enemies