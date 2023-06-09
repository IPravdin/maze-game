import React, {useEffect, useState} from "react";
import {PlayerSizeType, SizeType} from "../../types/global";
import {Coordinate} from "../../types/maze";
import {EnemyData} from "../../data/EnemyData";

type Props = {
    cellSize: SizeType
    playerSize: PlayerSizeType
    coord: Coordinate
}

const Enemy = ({cellSize, coord, playerSize}: Props) => {
    const [enemy, setEnemy] = useState(new EnemyData({
        left: coord.x * cellSize.width,
        top: coord.y * cellSize.height
    }))

    // For npc movements
    useEffect(() => {
        const interval = setInterval(() => {
            setEnemy((prevState) => ({
                ...prevState,
                /*position: {
                    top: prevState.position.top,
                    left: prevState.position.left + cellSize.width
                }*/
            }))
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return <div className="enemy" style={{ ...playerSize, left: enemy.position.left, top: enemy.position.top }}/>
}

export default Enemy