import React from "react";
import Bonus from "../maze/Bonus";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Spinner from "../Spinner";

const Hud = () => {
    const maze = useSelector((state: RootState) => state.maze);
    const player = useSelector((state: RootState) => state.player);
    const { hudSize } = maze.params;

    const width = hudSize.width / maze.params.bonuses;
    const bonusSize = {
        width: width > hudSize.height ? hudSize.height : width,
        height: width > hudSize.height ? hudSize.height : width,
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
        <div className="relative box-border mx-auto" style={{ width: hudSize.width, height: hudSize.height }}>
            {bonusesArray?.map((bonus) => bonus)}
        </div>
    )
}

export default Hud;