import MenuView from "./MenuView";
import { Dispatch, SetStateAction } from 'react';
import {MenuStateType} from "../MenuV2";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import { Skull, Trophy } from 'lucide-react';
import { SvgBonus } from '../../../assets/icons/bonus';
import { returnBonusCollectionRate } from '../../../utils/helpers';
import { StatCard } from '../../components/menu/StatCard';


const StatsContent = ({
    startTitle = false,
    setMenuState
}: {
    startTitle?: boolean,
    setMenuState: Dispatch<SetStateAction<MenuStateType>>
}) => {
    const { current, history } = useSelector((state: RootState) => state.stats);
    const { playerTotalDeath, levelsCompleted, bonusesCollected, bonusesTotal, stepsWalked } = current;

    return (
        <MenuView
            startTitle={startTitle}
            title="Statistics"
            content={
                <>
                    <p>Here you can view your achievements</p>
                    <ul className="stats">
                        <StatCard title={'Levels completed'} value={levelsCompleted.toString()} icon={<Trophy />}/>
                        <StatCard title={'Your Deaths'} value={playerTotalDeath.toString()} icon={<Skull />}/>
                        <StatCard
                            title={'Bonus Collection Rate'}
                            value={returnBonusCollectionRate(bonusesCollected, bonusesTotal).toLocaleString('en-US', { style: 'percent' })}
                            desc={"You've collected " + bonusesCollected + " out of " + bonusesTotal + " bonuses"}
                            icon={<SvgBonus width={48} height={48} />}
                        />
                    </ul>
                </>
            }
            cardActions={
                <>
                    <button className="btn" onClick={() => setMenuState('menu')}>
                        Back
                    </button>
                </>
            }
        />
    );
}

export default StatsContent;