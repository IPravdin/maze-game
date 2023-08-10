import {CreatureSizeType, PositionType, SizeType} from "../../../utils/types/global";

type Props = {
    position: PositionType,
    size: CreatureSizeType | SizeType,
    pulse?: boolean
}
const Bonus = ({ position, size, pulse = false }: Props) => {
    const {top, left} = position;
    return (
        <div
            className={`absolute z-10 bg-cover bg-no-repeat ${pulse ? 'animate-pulse' : ''}`}
            style={{
                ...size,
                backgroundImage: "url('/bonus.png')",
                left,
                top,
            }}
        />
    );
}

export default Bonus