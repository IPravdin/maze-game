import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";


const OptionsContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    return (
        <MenuView
            title="Options"
            content={
                <>
                    <p>Here you can configure you're game</p>
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