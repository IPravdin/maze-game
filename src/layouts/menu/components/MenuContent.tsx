import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import routerLinks from "../../../router-links";
import {Link} from "react-router-dom";
import {MenuStateType} from "../MenuV2";


const MenuContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    return (
        <MenuView
            title="Menu"
            content={
                <>
                    <Link className="w-full" to={routerLinks.game}>
                        <button className="btn btn-success">Continue</button>
                    </Link>
                    <button className="btn" onClick={() => setMenuState('options')}>Options</button>
                    <button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
                    <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>
                </>
            }
        />
    );
}

export default MenuContent;