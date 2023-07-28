import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";


const OptionsContent = ({ setOptions }: { setOptions: Dispatch<SetStateAction<boolean>>}) => {
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
                    <button className="btn btn-success" onClick={() => setOptions(false)}>
                        Back
                    </button>
                </>
            }
        />
    );
}

export default OptionsContent;