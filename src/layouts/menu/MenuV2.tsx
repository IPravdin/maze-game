import {useState} from "react";
import MenuContent from "./components/MenuContent";
import OptionsContent from "./components/OptionsContent";


const MenuV2 = () => {
    const [optionsView, setOptionsView] = useState(false);

    if (optionsView)
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-96">
                    <OptionsContent setOptions={setOptionsView} />
                </div>
            </div>
        );

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-96">
                <MenuContent setOptions={setOptionsView} />
            </div>
        </div>
    );
}

export default MenuV2;