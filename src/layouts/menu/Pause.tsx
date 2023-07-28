import {useState} from "react";
import OptionsContent from "./components/OptionsContent";
import MenuView from "./components/MenuView";
import routerLinks from "../../router-links";
import {useNavigate} from "react-router-dom";
import GameStateDialog from "../components/game/GameStateDialog";


const Pause = () => {
    const navigate = useNavigate();
    const [optionsView, setOptionsView] = useState(false);
    const [confirmLeave, setConfirmLeave] = useState(false);

    if (optionsView)
        return (
            <OptionsContent setOptions={setOptionsView} />
        );

    return (
        <>
            <MenuView
                content={
                    <>
                        <button className="btn w-full" onClick={() => setConfirmLeave(true)}>Back to Menu</button>
                        <button className="btn" onClick={() => setOptionsView(true)}>Options</button>
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