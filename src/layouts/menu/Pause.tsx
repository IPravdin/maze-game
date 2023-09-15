import {useState} from "react";
import OptionsContent from "./components/OptionsContent";
import MenuView from "./components/MenuView";
import routerLinks from "../../router-links";
import {useNavigate} from "react-router-dom";
import GameStateDialog from "../components/game/GameStateDialog";
import {MenuStateType} from "./MenuV2";
import CreditsContent from "./components/CreditsContent";
import {useDispatch} from "react-redux";
import StatsContent from "./components/StatsContent";


const Pause = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuState, setMenuState] = useState<MenuStateType>('menu');
    const [confirmLeave, setConfirmLeave] = useState(false);

    switch (menuState) {
        case "credits":
            return (
                <CreditsContent setMenuState={setMenuState} />
            );
        case "stats":
            return (
                <StatsContent setMenuState={setMenuState} />
            );
        case "options":
            return (
                <OptionsContent setMenuState={setMenuState} />
            );
    }


    return (
        <>
            <MenuView
                title="Pause"
                content={
                    <>
                        <button className="btn btn-success">Continue</button>
                        {/*<button className="btn" onClick={() => {
                            dispatch(mazeActions.generate());
                            dispatch(gameplayActions.unfroze());
                        }}>
                            Restart Level
                        </button>*/}
                        <button className="btn" onClick={() => setMenuState('options')}>Options</button>
                        {/*<button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
                        <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>*/}
                        <button className="btn" onClick={() => setConfirmLeave(true)}>Leave Game</button>
                    </>
                }
            />
            <GameStateDialog
                id="confirm-game-leave"
                open={confirmLeave}
                onClose={() => setConfirmLeave(false)}
                title="Leave a game"
                content="Are you sure you would like to leave a game? Your progress is saved only when a new level is loaded."
                btnSuccess="No"
                btnError="Yes"
                onErrorClick={() => navigate(routerLinks.menu)}
            />
        </>
    );
}

export default Pause;