import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";
import {useSoundPlayer} from "../../../utils/hooks/useSoundPlayer";
import RangeInput from "../../components/menu/RangeInput";


const OptionsContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    const soundPlayer = useSoundPlayer();
    return (
        <MenuView
            title="Options"
            content={
                <>
                    <p>Here you can configure you're game</p>
                    <RangeInput
                        id="music-volume"
                        value={soundPlayer.musicVolume}
                        setRangeState={soundPlayer.setMusicVolume}
                        label="Change Music Volume"
                    />
                    <RangeInput
                        id="sound-volume"
                        value={soundPlayer.soundVolume}
                        setRangeState={soundPlayer.setSoundVolume}
                        label="Change Sound Volume"
                    />
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

export default OptionsContent;