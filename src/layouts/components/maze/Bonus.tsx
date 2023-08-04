import {CreatureSizeType, PositionType, SizeType} from "../../../types/global";

type Props = {
    position: PositionType,
    size: CreatureSizeType | SizeType
}
const Bonus = ({ position, size }: Props) => {
    const {top, left} = position;
    return (
        <div
            className='absolute z-10 bg-cover bg-no-repeat'
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