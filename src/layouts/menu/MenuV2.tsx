import {useState} from "react";
import MenuContent from "./components/MenuContent";
import OptionsContent from "./components/OptionsContent";
import CreditsContent from "./components/CreditsContent";

export type MenuStateType = 'options' | 'menu' | 'credits';
const MenuV2 = () => {
    const [menuState, setMenuState] = useState<MenuStateType>('menu');

    if (menuState === 'options')
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-96">
                    <OptionsContent setMenuState={setMenuState} />
                </div>
            </div>
        );

    if (menuState === 'credits')
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-96">
                    <CreditsContent setMenuState={setMenuState} />
                </div>
            </div>
        );

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-96">
                <MenuContent setMenuState={setMenuState} />
            </div>
        </div>
    );
}

export default MenuV2;