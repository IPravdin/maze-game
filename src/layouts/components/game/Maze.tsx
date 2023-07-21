import Map from "../maze/Map";
import MapBonuses from "../maze/MapBonuses";
import Finish from "../maze/Finish";
import React, { ReactNode } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Enemies from "../maze/Enemies";
import Spinner from "../Spinner";

interface Props {
    player?: ReactNode,
}
const Maze = ({ player }: Props) => {
    const maze = useSelector((state: RootState) => state.maze);
    const enemies = useSelector((state: RootState) => state.enemies);

    const cellSize = maze.params.cellSize;

    if (!enemies.data) {
        return <Spinner />
    }

    return (
        <div className="container" style={{ ...maze.params.fieldSize  }}>
            <Enemies />
            {enemies.data.map((enemy, index) => {
                return (
                    <div key={index + ' spawn'} className='enemy-spawn' style={{
                        left: enemy.spawn.x * cellSize.width,
                        top: enemy.spawn.y * cellSize.height,
                        width: cellSize.width,
                        height: cellSize.height
                    }}/>
                )
            })}
            {enemies.data.map((enemy, index1) => (
                enemy.movement.map((movement, index2) => (
                    movement.map((side, index3) => (
                        <div key={index1 + index2 + index3} className='enemy-move' style={{
                            left: side.x * cellSize.width,
                            top: side.y * cellSize.height,
                            width: cellSize.width,
                            height: cellSize.height
                        }}/>
                    ))
                ))
            ))}
            {player}
            <Map mazeMap={maze.data.mazeMap} cellSize={maze.params.cellSize}/>
            <MapBonuses mazeMap={maze.data.mazeMap} cellSize={maze.params.cellSize}/>
            <Finish coord={maze.data.endCoord} cellSize={maze.params.cellSize}/>
        </div>
    )
}

export default Maze;