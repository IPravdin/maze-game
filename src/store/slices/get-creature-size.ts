import {CreatureSizeType, SizeType} from "../../types/global";

export const initialCreatureSize = { width: 0, height: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, };
const getCreatureSize = (cellSize: SizeType): CreatureSizeType => {
    const marginY = cellSize.width / 16 * 2;
    const marginX = cellSize.height / 16 * 2;

    return {
        width: cellSize.width - marginY * 2,
        height: cellSize.height - marginX * 2,
        marginTop: marginY,
        marginBottom: marginY,
        marginLeft: marginX,
        marginRight: marginX,
    }
}

export default getCreatureSize;