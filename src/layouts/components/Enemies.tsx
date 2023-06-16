import React from "react";
import {PlayerSizeType, SizeType} from "../../types/global";
import Enemy from "./Enemy";
import {MazeEnemy} from "../../types/enemy";

type Props = {
    cellSize: SizeType
    playerSize: PlayerSizeType
    enemiesData: MazeEnemy[]
}

const Enemies = ({enemiesData, cellSize, playerSize}: Props) => {
    return (
        <div>
            {enemiesData.map(({spawn}) =>
                <Enemy key={`enemy[${spawn.x}][${spawn.y}]`} coord={spawn} cellSize={cellSize} playerSize={playerSize}/>
            )}
        </div>
    )
}

export default Enemies