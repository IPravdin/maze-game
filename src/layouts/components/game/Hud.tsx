import React from "react";
import Bonus from "../maze/Bonus";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Spinner from "../Spinner";

const Hud = () => {
    const maze = useSelector((state: RootState) => state.maze);
    const player = useSelector((state: RootState) => state.player);
    const { cellSize, fieldSize } = maze.params;

    if (!player.data) {
        return <Spinner />
    }


    const bonusesArray = []
    for (let i = 0; i < player.data.collectedBonuses; i++) {
        bonusesArray.push(
            <Bonus
                key={i}
                position={{ left: i * cellSize.width, top: 0 }}
                size={{
                    width: cellSize.width,
                    height: cellSize.height,
                }}
            />
        )
    }

    return (
        <div className="container" style={{ width: fieldSize.width, height: 100 }}>
            {bonusesArray?.map((bonus) => bonus)}
        </div>
    )
}

export default Hud;