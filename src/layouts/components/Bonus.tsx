import {PositionType, SizeType} from "../../types/global";

type Props = {
    size: SizeType
    position: PositionType
}
const Bonus = ({ size, position }: Props) => {
    const {height, width} = size
    const {top, left} = position
    return <div className='bonus' style={{ left, top, width, height }}/>
}

export default Bonus