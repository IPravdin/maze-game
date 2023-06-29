import React from "react";
import Bonus from "./maze/Bonus";
import {SizeType} from "../../types/global";

const Hud = ({ bonuses, cellSize, hudSize }: { bonuses: number, cellSize: SizeType, hudSize: SizeType }) => {
    const {height, width} = cellSize
    const bonusesArray = []

    for (let i = 0; i < bonuses; i++) {
        bonusesArray[i] = <Bonus key={i} position={{left: i * width, top: 0}} size={{width, height}} />
    }

    return (
        <div className="container" style={{ width: hudSize.width, height: hudSize.height }}>
            {bonusesArray?.map((bonus) => bonus)}
        </div>
    )
}

export default Hud;