import Map from "../maze/Map";
import MapBonuses from "../maze/MapBonuses";
import Finish from "../maze/Finish";
import { ReactNode } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Enemies from "../maze/Enemies";

interface Props {
    player?: ReactNode,
}
const Maze = ({ player }: Props) => {
    const maze = useSelector((state: RootState) => state.maze);

    return (
        <div className="container" style={{ ...maze.params.fieldSize  }}>
            <Enemies />
            {player}
            <Map mazeMap={maze.data.mazeMap} cellSize={maze.params.cellSize}/>
            <MapBonuses mazeMap={maze.data.mazeMap} cellSize={maze.params.cellSize}/>
            <Finish coord={maze.data.endCoord} cellSize={maze.params.cellSize}/>
        </div>
    )
}

export default Maze;