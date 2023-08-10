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
                        <li>
                            <a className="link" href="https://cynicmusic.com/" target="_blank">
                                Alex Smith
                            </a>
                            {' '}
                            for Rotating Worlds, Icy Expanse, The Void, Tale of Winter, and for Crystal Cave and Mysterious Ambience songs
                            {' '}
                            and
                            {' '}
                            <a className="link" href="https://opengameart.org/content/crystal-cave-mysterious-ambience-seamless-loop" target="_blank">
                                Congusbongus
                            </a>
                            {' '}
                            for mixing them.
                        </li>
                        <li>
                            GlennM for the player's foot step
                            {' '}
                            <a className="link" href="https://freesound.org/people/GlennM/sounds/386525/">
                                sound
                            </a>
                        </li>
                        <li>
                            MATRIXXX_ for the coin collection
                            {' '}
                            <a className="link" href="https://freesound.org/people/MATRIXXX_/sounds/402288/">
                                sound
                            </a>
                        </li>
                        <li>
                            HorrorAudio for the enemy
                            {' '}
                            <a className="link" href="https://freesound.org/people/HorrorAudio/sounds/431979/">
                                sound
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