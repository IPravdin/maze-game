import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";


const StatsContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    const gameplay = useSelector((state: RootState) => state.gameplay);
    return (
        <MenuView
            title="Statistics"
            content={
                <>
                    <p><b>You're gameplay progress is displayed here</b></p>
                    <ul>
                        <li>Levels accomplished: {gameplay.levelsCompleted}</li>
                        <li>Killed: {gameplay.playerDeath}</li>
                        <li>Bonuses collected: {gameplay.bonusesCollected} out of {gameplay.bonusesTotal}</li>
                        <li>Steps walked: {gameplay.stepsWalked}</li>
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