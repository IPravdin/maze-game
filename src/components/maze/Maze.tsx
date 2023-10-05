import Map from "./Map";
import MapBonuses from "./MapBonuses";
import Finish from "./Finish";
import React, { ReactNode } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Enemies from "./Enemies";

interface Props {
  player?: ReactNode,
}
const Maze = ({ player }: Props) => {
    const maze = useSelector((state: RootState) => state.maze);

    return (
        <div className="relative box-border mx-auto my-10" style={{ ...maze.params.fieldSize  }}>
            <Map mazeMap={maze.data.mazeMap} cellSize={maze.params.cellSize}/>
            <Enemies />
            {player}
            <MapBonuses />
            <Finish coord={maze.data.endCoord} cellSize={maze.params.cellSize}/>
        </div>
    )
}

export default Maze;