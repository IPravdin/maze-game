import React from "react";
import {SizeType} from "../../utils/types/global";
import {CoordinateType} from "../../utils/types/maze";

const Finish = ({coord, cellSize}: {
  coord: CoordinateType
  cellSize: SizeType
}) => {
    const style = {
        width: cellSize.width,
        height: cellSize.height,
        left: coord.x * cellSize.width,
        top: coord.y * cellSize.height,
    };

    return (
        <div>
            <div
                className="absolute bg-cover bg-no-repeat"
                style={{
                    ...style,
                    backgroundImage: "url('/cells/finish-cell-bg.png')"
                }}
            />
            <div
                className="absolute bg-cover bg-no-repeat animate-ping"
                style={{
                    ...style,
                    backgroundImage: "url('/cells/finish-animation.png')"
                }}
            />
        </div>
    );
}

export default Finish