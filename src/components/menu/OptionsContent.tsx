import MenuView from "./MenuView";
import { Dispatch, SetStateAction } from 'react';
import {MenuStateType} from "../../pages/Menu";
import {useSoundPlayer} from "../../utils/hooks/useSoundPlayer";
import RangeInput from "../RangeInput";

const OptionsContent = ({
    startTitle = false,
    setMenuState
}: {
    startTitle?: boolean,
    setMenuState: Dispatch<SetStateAction<MenuStateType>>
}) => {
    const soundPlayer = useSoundPlayer();
    return (
        <MenuView
            startTitle={startTitle}
            title="Options"
            content={
                <>
                    <p>Here you can configure you're game</p>
                    <RangeInput
                        id="music"
                        value={soundPlayer.musicVolume}
                        setRangeState={soundPlayer.setVolume}
                        setDefault={soundPlayer.setVolumeDefault}
                        label="Change Music Volume"
                    />
                    <RangeInput
                        id="sound"
                        value={soundPlayer.soundVolume}
                        setRangeState={soundPlayer.setVolume}
                        setDefault={soundPlayer.setVolumeDefault}
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