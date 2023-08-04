import MenuView from "./MenuView";
import {Dispatch, SetStateAction} from "react";
import {MenuStateType} from "../MenuV2";


const CreditsContent = ({ setMenuState }: { setMenuState: Dispatch<SetStateAction<MenuStateType>>}) => {
    return (
        <MenuView
            title="Credits"
            content={
                <>
                    <p>Thank you these creators for inspiration and allowance to use their work in this game prototype</p>
                    <ul>
                        <li>
                            Kenney Asset Packs:
                            {' '}
                            <a className="link" href="https://www.kenney.nl/assets/1-bit-pack" target="_blank">
                                1-Bit Pack
                            </a>
                            {' '}
                            (bonus and inspiration for map cells), and
                            {' '}
                            <a className="link" href="https://www.kenney.nl/assets/tiny-dungeon" target="_blank">
                                Tiny Dungeon
                            </a>
                            {' '}
                            (enemies and playable character).
                        </li>
                        <li>
                            <a className="link" href="https://www.youtube.com/watch?v=EN733Aq4ynM&ab_channel=Devression" target="_blank">
                                Devression Youtube Chanel
                            </a>
                            {' '}
                            for inspiration and
                            {' '}
                            <a className="link" href="https://github.com/devression/Maze-Game" target="_blank">
                                a maze generator
                            </a>
                        </li>
                    </ul>
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

export default CreditsContent;