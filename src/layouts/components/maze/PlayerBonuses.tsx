import Bonus from "./Bonus";

type Props = {
    bonuses: number,
    cellSize: {height: number, width: number}
}
const PlayerBonuses = ({bonuses, cellSize}: Props) => {
    const {height, width} = cellSize
    const bonusesArray = []

    for(let i = 0; i < bonuses; i++) {
        bonusesArray[i] = <Bonus key={i} position={{left: i * width, top: 0}} size={{width, height}} />
    }

    return (
        <>{bonusesArray?.map((bonus) => bonus)}</>
    )
}

export default PlayerBonuses