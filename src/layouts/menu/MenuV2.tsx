import {useEffect, useState} from "react";
import MenuContent from "./components/MenuContent";
import OptionsContent from "./components/OptionsContent";
import CreditsContent from "./components/CreditsContent";
import {useSoundPlayer} from "../../utils/hooks/useSoundPlayer";
import StatsContent from "./components/StatsContent";

export type MenuStateType = 'options' | 'menu' | 'credits' | 'stats';
const MenuV2 = () => {
    const soundPlayer = useSoundPlayer();
    const [menuState, setMenuState] = useState<MenuStateType>('menu');

    useEffect(() => {
        soundPlayer.play('menu');
    }, [soundPlayer])

    switch (menuState) {
        case 'options':
            return <OptionsContent startTitle={true} setMenuState={setMenuState} />;
        case 'credits':
            return <CreditsContent startTitle={true} setMenuState={setMenuState} />;
        case 'stats':
            return <StatsContent startTitle={true} setMenuState={setMenuState} />;
        default:
            return <MenuContent startTitle={true} setMenuState={setMenuState} />;
    }
}

export default MenuV2;