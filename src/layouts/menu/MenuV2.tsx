import {useEffect, useState} from "react";
import MenuContent from "./components/MenuContent";
import OptionsContent from "./components/OptionsContent";
import CreditsContent from "./components/CreditsContent";
import {useSoundPlayer} from "../../utils/hooks/useSoundPlayer";

export type MenuStateType = 'options' | 'menu' | 'credits';
const MenuV2 = () => {
    const soundPlayer = useSoundPlayer();
    const [menuState, setMenuState] = useState<MenuStateType>('menu');

    useEffect(() => {
        soundPlayer.play('menu');
    }, [soundPlayer])

    if (menuState === 'options')
        return (
            <OptionsContent setMenuState={setMenuState} />
        );

    if (menuState === 'credits')
        return (
            <CreditsContent setMenuState={setMenuState} />
        );

    return (
        <MenuContent setMenuState={setMenuState} />
    );
}

export default MenuV2;