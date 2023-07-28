import React from "react";
import Bonus from "../maze/Bonus";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Spinner from "../Spinner";

const Hud = () => {
    const maze = useSelector((state: RootState) => state.maze);
    const player = useSelector((state: RootState) => state.player);
    const { fieldSize } = maze.params;

    const bonusSize = {
        width: fieldSize.width / maze.params.bonuses,
        height: fieldSize.width / maze.params.bonuses
    }

    if (!player.data) {
        return <Spinner />
    }


    const bonusesArray = []
    for (let i = 0; i < player.data.collectedBonuses; i++) {
        bonusesArray.push(
            <Bonus
                key={i}
                position={{ left: i * bonusSize.width, top: 0 }}
                size={{
                    width: bonusSize.width,
                    height: bonusSize.height,
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