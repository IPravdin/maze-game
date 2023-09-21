import MenuView from "./MenuView";
import {Dispatch, SetStateAction, useState} from "react";
import routerLinks from "../../../router-links";
import {Link, useNavigate} from "react-router-dom";
import {MenuStateType} from "../MenuV2";
import GameStateDialog from "../../components/game/GameStateDialog";
import {useDispatch, useSelector} from "react-redux";
import {gameReset} from "../../../store/slices/game-reset";
import {RootState} from "../../../store";
import {gameplayActions} from "../../../store/slices/gameplay";
import SvgTitle from "../../../assets/icons/title";

const MenuContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firstLaunch } = useSelector((state: RootState) => state.gameplay);
    const [confirmReset, setConfirmReset] = useState(false);

    return (
        <>
            <MenuView
                /*title="aMAZE GAME"
                titleClasses="font-primary text-8xl pb-20"*/
                content={
                    <>
                        <div className="mb-20">
                            <SvgTitle />
                        </div>
                        <Link className="w-full" to={routerLinks.game}>
                            <button className="btn btn-success w-full" onClick={() => dispatch(gameplayActions.setFirstLaunchOff())}>
                                {firstLaunch ? "Start New Game" : "Continue"}
                            </button>
                        </Link>
                        {!firstLaunch && (
                            <button className="btn" onClick={() => setConfirmReset(true)}>New Game</button>
                        )}
                        <button className="btn" onClick={() => setMenuState('options')}>Options</button>
                        <button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
                        <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>
                    </>
                }
            />
            <GameStateDialog
                id="confirm-game-reset"
                open={confirmReset}
                onClose={() => setConfirmReset(false)}
                title="Reset a game"
                content="Are you sure you would like to reset all progress? All statisctics will be lost as well"
                btnSuccess="No"
                btnError="Yes"
                onErrorClick={() => {
                    // @ts-ignore
                    dispatch(gameReset());
                    setTimeout(() => navigate(routerLinks.game), 10);
                }}
            />
        </>
    );
}

export default MenuContent;