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
            return (
                <OptionsContent setMenuState={setMenuState} />
            );
        case 'credits':
            return (
                <CreditsContent setMenuState={setMenuState} />
            );
        case 'stats':
            return (
                <StatsContent setMenuState={setMenuState} />
            );
        default:
            return (
                <MenuContent setMenuState={setMenuState} />
            );
    }
}

export default MenuV2;