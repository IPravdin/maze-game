import {createContext, ReactNode, useContext} from "react";
import useSound from "use-sound";
import crystalCave from "../../assets/music/crystal_cave_mysterious_ambience.ogg";
import mysteriousAmbience from "../../assets/music/mysterious_ambience.mp3";
import playerStepSound from "../../assets/sounds/386525__glennm__right_foot_stone.mp3";
import coinCollectSound from "../../assets/sounds/402288__matrixxx__retro-coin-02.mp3";
import ghostSound from "../../assets/sounds/431979__horroraudio__kid-ghost-sigh.wav";
import playerDeathSound from "../../assets/sounds/204450__ludist__soul-death.mp3";
import teleportSound from "../../assets/sounds/104076__jobro__alien-windbells-up.wav";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {gameplayActions} from "../../store/slices/gameplay";

type SongType = 'menu' | 'main' | 'step' | 'collectCoin' | 'enemy' | 'teleport' | 'death';

const SoundPlayerContext = createContext<{
    musicVolume: number,
    soundVolume: number,
    play: (mode?: SongType) => void,
    setMusicVolume: (volume: number) => void,
    setSoundVolume: (volume: number) => void,
}>({
    musicVolume: 0,
    soundVolume: 0,
    play: () => {
        throw new Error('play is not implemented');
    },
    setMusicVolume: () => {
        throw new Error('setMusicVolume is not implemented');
    },
    setSoundVolume: () => {
        throw new Error('setSoundVolume is not implemented');
    },
})
export function SoundPlayerProvider({ children }: { children: ReactNode }) {
    const { musicVolume, soundVolume } = useSelector((state: RootState) => state.gameplay);
    const dispatch = useDispatch();

    const [playMenu, { stop: stopMenu, pause: pauseMenu }] = useSound(mysteriousAmbience, {
        volume: returnVolumeFormat(musicVolume),
        soundEnabled: !!musicVolume,
        loop: true
    });

    const [playMain, { stop: stopMain, pause: pauseMain }] = useSound(crystalCave, {
        volume: returnVolumeFormat(musicVolume),
        soundEnabled: !!musicVolume,
        loop: true
    });

    const [playStep] = useSound(playerStepSound, {
        volume: returnVolumeFormat(soundVolume),
        soundEnabled: !!soundVolume,
    });

    const [playCoinCollect] = useSound(coinCollectSound, {
        volume: returnVolumeFormat(soundVolume),
        soundEnabled: !!soundVolume,
    });
    const [playGhost, { stop: stopGhost }] = useSound(ghostSound, {
        volume: returnVolumeFormat(soundVolume),
        soundEnabled: !!soundVolume,
    });

    const [playDeath] = useSound(playerDeathSound, {
        volume: returnVolumeFormat(soundVolume),
        soundEnabled: !!soundVolume,
    });

    const [playTeleport] = useSound(teleportSound, {
        volume: returnVolumeFormat(soundVolume),
        soundEnabled: !!soundVolume,
    });

    const musicArray: { id: SongType, stop: (id?: (string | undefined)) => void, pause: (id?: (string | undefined)) => void}[] = [
        { id: 'menu', stop: stopMenu, pause: pauseMenu },
        { id: 'main', stop: stopMain, pause: pauseMain },
    ];

    const handleStop = (mode: SongType) => {
        musicArray.forEach((item) => {
            if (item.id !== mode) {
                item.stop();
            } else {
                item.pause();
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
                handleStop(mode);
                stopGhost();
                playTeleport();
                break;
            case "death":
                handleStop(mode);
                stopGhost();
                playDeath();
                break;
        }
    }

    const setMusicVolume = (vol: number) => {
        dispatch(gameplayActions.setMusicVolume(vol));
    }

    const setSoundVolume = (vol: number) => {
        dispatch(gameplayActions.setSoundVolume(vol));
    }

    return (
        <SoundPlayerContext.Provider
            value={{
                musicVolume,
                soundVolume,
                setMusicVolume,
                setSoundVolume,
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

function returnVolumeFormat(stateVolume: number) {
    return stateVolume / 100;
}