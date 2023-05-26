import React from "react";
import {PlayerSizeType, PositionType} from "../../types/global";

type Props = {
    position: PositionType,
    playerSize: PlayerSizeType
}
const Player = ({position, playerSize}: Props) => {
    const {top, left} = position
    return <div className="player" style={{ ...playerSize, top, left }}/>
}

export default Player