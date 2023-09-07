import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";


const StatsContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    const stats = useSelector((state: RootState) => state.stats);
    return (
        <MenuView
            title="Statistics"
            content={
                <>
                    <p><b>You're gameplay progress is displayed here</b></p>
                    <ul>
                        <li>Levels accomplished: {stats.levelsCompleted}</li>
                        <li>Killed: {stats.playerDeath}</li>
                        <li>Bonuses collected: {stats.bonusesCollected} out of {stats.bonusesTotal}</li>
                        <li>Steps walked: {stats.stepsWalked}</li>
                    </ul>
                </>
            }
            cardActions={
                <>
                    <button className="btn btn-success" onClick={() => setMenuState('menu')}>
                        Back
                    </button>
                </>
            }
        />
    );
}

export default StatsContent;