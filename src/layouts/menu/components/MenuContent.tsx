import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import routerLinks from "../../../router-links";
import {Link} from "react-router-dom";


const MenuContent = ({ setOptions }: { setOptions: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <MenuView
            title="Menu"
            content={
                <>
                    <Link className="w-full" to={routerLinks.game}>
                        <button className="btn w-full">Start</button>
                    </Link>
                    <button className="btn" onClick={() => setOptions(true)}>Options</button>
                </>
            }
        />
    );
}

export default MenuContent;