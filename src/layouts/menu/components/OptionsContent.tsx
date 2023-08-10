import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";
import {useSoundPlayer} from "../../../utils/hooks/useSoundPlayer";


const OptionsContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    const soundPlayer = useSoundPlayer();
    return (
        <MenuView
            title="Options"
            content={
                <>
                    <p>Here you can configure you're game</p>
                    <button className="btn" onClick={() => soundPlayer.changeVolume(1)}>Increase</button>
                    <button className="btn" onClick={() => soundPlayer.changeVolume(0.1)}>Decrease</button>
                    <button className="btn" onClick={() => soundPlayer.changeVolume(0)}>Mute</button>
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

export default OptionsContent;