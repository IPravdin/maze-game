import Map from "../maze/Map";
import MapBonuses from "../maze/MapBonuses";
import Finish from "../maze/Finish";
import { ReactNode } from "react";
import { CoordinateType, MazeCell } from "../../../types/maze";
import { SizeType } from "../../../types/global";

interface Props {
    size: SizeType,
    mazeMap: MazeCell[][],
    finishCoord: CoordinateType,
    cellSize: SizeType,

    enemies?: ReactNode,
    player?: ReactNode,
}
const Maze = ({ enemies, mazeMap, finishCoord, size, cellSize, player }: Props) => {

    return (
        <div className="container" style={{ ...size }}>
            {enemies}
            {player}
            <Map mazeMap={mazeMap} cellSize={cellSize}/>
            <MapBonuses mazeMap={mazeMap} cellSize={cellSize}/>
            <Finish coord={finishCoord} cellSize={cellSize}/>
        </div>
    )
}

export default Maze;