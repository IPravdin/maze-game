import {createContext, ReactNode, useContext, useState} from "react";
import useSound from "use-sound";
import crystalCave from "../../assets/music/crystal_cave_mysterious_ambience.ogg";
import taleOfWinter from "../../assets/music/037_Tale_of_Winter.mp3";
import rotatingWorlds from "../../assets/music/026_Rotating_Worlds.mp3";
import playerStepSound from "../../assets/sounds/386525__glennm__right_foot_stone.wav";
import coinCollectSound from "../../assets/sounds/402288__matrixxx__retro-coin-02.wav";
import ghostSound from "../../assets/sounds/431979__horroraudio__kid-ghost-sigh.wav";
import playerDeathSound from "../../assets/sounds/204450__ludist__soul-death.mp3";

type SongType = 'menu' | 'main' | 'secondary' | 'step' | 'collectCoin' | 'enemy' | 'teleport' | 'death';

const SoundPlayerContext = createContext<{
    volume: number,
    play: (mode?: SongType) => void,
    changeVolume: (volume: number) => void,
}>({
    volume: 0,
    play: () => {
        throw new Error('play is not implemented');
    },
    changeVolume: () => {
        throw new Error('setVolume is not implemented');
    },
})
export function SoundPlayerProvider({ children }: { children: ReactNode }) {
    const [volume, setVolume] = useState<number>(0.2);
    const [soundVolume, setSoundVolume] = useState<number>(1);

    const [playMenu, { stop: stopMenu, pause: pauseMenu }] = useSound(taleOfWinter, {
        volume,
        soundEnabled: !!volume,
        loop: true
    });

    const [playMain, { stop: stopMain, pause: pauseMain }] = useSound(crystalCave, {
        volume,
        soundEnabled: !!volume,
        loop: true
    });

    const [playSec, { stop: stopSec, pause: pauseSec }] = useSound(rotatingWorlds, {
        volume,
        soundEnabled: !!volume,
    });

    const [playStep] = useSound(playerStepSound, {
        volume: soundVolume,
        soundEnabled: !!soundVolume,
    });

    const [playCoinCollect] = useSound(coinCollectSound, {
        volume: soundVolume,
        soundEnabled: !!soundVolume,
    });
    const [playGhost, { stop: stopGhost }] = useSound(ghostSound, {
        volume: soundVolume,
        soundEnabled: !!soundVolume,
    });

    /*const [playTeleport] = useSound(ghostSound, {
        volume: soundVolume,
        soundEnabled: !!soundVolume,
    });*/

    const [playDeath] = useSound(playerDeathSound, {
        volume: soundVolume,
        soundEnabled: !!soundVolume,
    });

    const musicArray: { id: SongType, stop: (id?: (string | undefined)) => void, pause: (id?: (string | undefined)) => void}[] = [
        { id: 'menu', stop: stopMenu, pause: pauseMenu },
        { id: 'main', stop: stopMain, pause: pauseMain },
        { id: 'secondary', stop: stopSec, pause: pauseSec },
    ];

    const changeVolume = (volume: number) => {
        setVolume(prevState => volume);
    }

    const handleStop = (mode: SongType) => {
        musicArray.forEach((item) => {
            if (item.id !== mode) {
                item.stop();
            }
        })

    }

    const handlePlay = (mode?: SongType) => {
        if (!mode) mode = 'main';

        switch (mode) {
            case "menu":
                handleStop(mode);
                playMenu();
                break;
            case "main":
                handleStop(mode);
                playMain();
                break;
            case "secondary":
                handleStop(mode);
                playSec();
                break;
            case "step":
                playStep();
                break;
            case "collectCoin":
                stopGhost();
                playCoinCollect();
                break;
            case "enemy":
                playGhost();
                break;
            case "teleport":
                stopGhost();
                break;
            case "death":
                stopGhost();
                playDeath();
                break;
        }
    }

    return (
        <SoundPlayerContext.Provider
            value={{
                volume,
                changeVolume,
                play: handlePlay,
            }}
        >
            {children}
        </SoundPlayerContext.Provider>
    );
}

export function useSoundPlayer() {
    return useContext(SoundPlayerContext);
}