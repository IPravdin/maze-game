import React from "react";
import Bonus from "../maze/Bonus";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Spinner from "../Spinner";

const HEIGHT = 100;
const Hud = () => {
    const maze = useSelector((state: RootState) => state.maze);
    const player = useSelector((state: RootState) => state.player);
    const { fieldSize } = maze.params;

    const width = fieldSize.width / maze.params.bonuses;
    const bonusSize = {
        width: width > HEIGHT ? HEIGHT : width,
        height: HEIGHT
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
                size={bonusSize}
            />
        )
    }

    return (
        <div className="relative bg-[#472d3c] box-border mx-auto my-10" style={{ width: fieldSize.width, height: HEIGHT }}>
            {bonusesArray?.map((bonus) => bonus)}
        </div>
    )
}

export default Hud;