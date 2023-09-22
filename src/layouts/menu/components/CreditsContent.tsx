import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";
import CreditsTable from "../../components/menu/CreditsTable";

const CreditsContent = ({
    startTitle = false,
    setMenuState
}: {
    startTitle?: boolean,
    setMenuState: Dispatch<SetStateAction<MenuStateType>>
}) => {
    return (
        <MenuView
            startTitle={startTitle}
            title="Credits"
            content={
                <>
                    <p>Thank you these creators for inspiration and allowance to use their work in this game prototype</p>
                    <CreditsTable />
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

export default CreditsContent;