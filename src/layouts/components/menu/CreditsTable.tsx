import {creditsType} from "../../../utils/types/menu";
import {Fragment} from "react";
import {LicenceEnum} from "../../../utils/enums/licence-enum";

const data: creditsType[] = [
    { id: 1, key: "maze-pack", author: "Kenney", title: "1-Bit Pack", for: "Bonus and Inspiration for Map Cells", link: "https://www.kenney.nl/assets/1-bit-pack", licence: "CC0", changes: "Map cells was created using the reference to the pack and pack's color scheme" },
    { id: 2, key: "characters-pack", author: "Kenney", title: "Tiny Dungeon", for: "Enemies and Playable Character Sprites", link: "https://www.kenney.nl/assets/tiny-dungeon", licence: "CC0", changes: "Color of Player and Enemies was slightly modified and the original sprite from pack is used to create other character poses." },
    { id: 3, key: "maze-generator", author: "Devression", title: "Maze-Game", for: "Maze generator", link: "https://github.com/devression/Maze-Game", licence: "", changes: "Inspiration for the game's maze generator", },
    { id: 4, key: "menu-music", author: "Cynicmusic (pixelsphere.org)", title: "Mysterious Ambience (song21)", for: "Menu Soundtrack", link: "https://opengameart.org/content/mysterious-ambience-song21", licence: "CC BY 3.0", changes: "" },
    { id: 5, key: "gameplay-music", author: "Cynicmusic (pixelsphere.org), mixed by congusbongus", title: "Crystal Cave + Mysterious Ambience (seamless loop)", for: "Gameplay Soundtrack", link: "https://opengameart.org/content/crystal-cave-mysterious-ambience-seamless-loop", licence: "CC BY 3.0", changes: "" },
    { id: 6, key: "footstep-sound", author: "GlennM", title: "right_foot_stone.wav", for: "Player Footstep Sound", link: "https://freesound.org/s/386525/", licence: "CC BY 3.0", changes: "Gain was increased by 10 db" },
    { id: 7, key: "coin-sound", author: "MATRIXXX_", title: "Retro, Coin 02.wav", for: "Coin Pickup Sound", link: "https://freesound.org/s/402288/", licence: "CC0", changes: "Gain was lowered by 10 db" },
    { id: 8, key: "enemy-sound", author: "HorrorAudio", title: "Kid Ghost Sigh.wav", for: "Enemy Sound", link: "https://freesound.org/s/431979/", licence: "CC0", changes: "" },
    { id: 9, key: "teleport-sound", author: "Jobro", title: "Alien windbells up.wav", for: "Teleport Sound", link: "https://freesound.org/s/104076/", licence:"CC BY 3.0", changes: "" },
    { id: 10, key: "death-sound", author: "Ludist", title: "soul- death.mp3", for: "Death Sound", link: "https://freesound.org/s/204450/", licence: "CC BY 3.0", changes: "Gain was increased by 5 db" }
];

const CreditsTable = () => {

    return (
        <div className="w-full max-h-80 overflow-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <Fragment key={key}>
                                {key !== 'link' && key !== 'key' && <th>{key}</th>}
                            </Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.key}>
                            {Object.keys(row).map((key, index) => (
                                <Fragment key={row.key + index}>
                                    {/*@ts-ignore*/}
                                    {(key !== 'link' && key !== 'title' && key !== 'key' && key !== 'licence') && <td>{row[key]}</td>}
                                    {key === 'title' &&
                                        <td><a className="link" href={row.link}>{row.title}</a></td>}
                                    {key === 'licence' ? (
                                        <>
                                            {row.licence ? (
                                                <td>
                                                    <a className="link"
                                                       href={LicenceEnum[row.licence]}>{row.licence}</a>
                                                </td>
                                            ) : (
                                                <td>Missing</td>
                                            )}
                                        </>
                                    ) : null}
                                </Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CreditsTable;