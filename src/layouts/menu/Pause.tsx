import {useState} from "react";
import OptionsContent from "./components/OptionsContent";
import MenuView from "./components/MenuView";
import routerLinks from "../../router-links";
import {useNavigate} from "react-router-dom";
import GameStateDialog from "../components/game/GameStateDialog";
import {MenuStateType} from "./MenuV2";
import CreditsContent from "./components/CreditsContent";


const Pause = () => {
    const navigate = useNavigate();
    const [menuState, setMenuState] = useState<MenuStateType>('menu');
    const [confirmLeave, setConfirmLeave] = useState(false);

    if (menuState === 'options')
        return (
            <OptionsContent setMenuState={setMenuState} />
        );

    if (menuState === 'credits')
        return (
            <CreditsContent setMenuState={setMenuState} />
        );

    return (
        <>
            <MenuView
                content={
                    <>
                        <button className="btn btn-success">Continue</button>
                        <button className="btn w-full" onClick={() => setConfirmLeave(true)}>Back to Menu</button>
                        <button className="btn" onClick={() => setMenuState('options')}>Options</button>
                        <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>
                    </>
                }
            />
            <GameStateDialog
                id="confirm-game-leave"
                open={confirmLeave}
                onClose={() => setConfirmLeave(false)}
                title="Leave a game"
                content="Are you sure you would like to leave a game? All progress won't be saved."
                btnSuccess="No"
                btnError="Yes"
                onErrorClick={() => navigate(routerLinks.menu)}
            />
        </>
    );
}

export default Pause;