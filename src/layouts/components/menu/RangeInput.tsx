import {ChangeEvent} from "react";

type Props = {
    id: string,
    value: number,
    setRangeState: (volume: number) => void,
    label: string
}
const RangeInput = ({ id, label, value, setRangeState }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setRangeState(parseInt(e.target.value));
    }

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                className="range"
                id={id}
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default RangeInput;