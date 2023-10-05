import Player from "../components/maze/Player";
import React, {useEffect, useRef} from "react";
import Hud from "../components/game/Hud";
import Maze from "../components/maze/Maze";
import {PlayerMoveKeys} from "../utils/types/player";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState } from "../store";
import {gameplayActions} from "../store/slices/gameplay";
import {mazeFetch} from "../store/slices/maze-fetch";
import { objectsEqual, positionToCoord } from '../utils/helpers';
import {PlayerDataJsonType} from "../data/PlayerData";
import {playerActions} from "../store/slices/player";
import {useSoundPlayer} from "../utils/hooks/useSoundPlayer";
import {statsActions} from "../store/slices/stats";
import GameDialogs from '../components/game/GameDialogs';

const Game = () => {
    const dispatch: AppDispatch = useDispatch();
    const gameplay = useSelector((state: RootState) => state.gameplay);
    const player = useSelector((state: RootState) => state.player);
    const enemies = useSelector((state: RootState) => state.enemies);
    const maze = useSelector((state: RootState) => state.maze);
    const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);

    const divRef = useRef<HTMLDivElement>(null);
    const soundPlayer = useSoundPlayer();

    useEffect(() => {
        if (gameplay.frozenMode === 'none') {
            soundPlayer.play('main');
        }
    }, [gameplay.frozenMode])

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return;
        divRef.current?.focus();
    }, [divRef, player.data]);

    // ** Maintains same start data for Reducers
    useEffect(() => {
        // @ts-ignore
        dispatch(mazeFetch());
    }, [dispatch, maze.params, maze.data.startCoord, maze.data.enemies]);

    // ** Kills Player
    useEffect(() => {
        if (!enemies.data.enemiesCurCoords) return;
        if (!player.data) return;
        if (!player.data?.alive) return;

        const clashed =
            enemies.data.enemiesCurCoords.find((enemyCoord) =>
                objectsEqual(enemyCoord, positionToCoord((player.data as PlayerDataJsonType).currentPosition, cellSize)));
        if (clashed) {
            dispatch(playerActions.kill());
            dispatch(statsActions.recordLevelDeath());
            dispatch(gameplayActions.froze('lost'));
            soundPlayer.play('death');
        }
    }, [player.data?.currentPosition, enemies.data.enemiesCurCoords]);

    const keyDownListener = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (gameplay.frozenMode === 'none' && event.code === "Escape") {
            dispatch(gameplayActions.froze('pause'));
        }

        if (!gameplay.frozen && player.data?.alive) {
            if (event.code === "ArrowRight"
                || event.code === "KeyD"
                || event.code === "ArrowLeft"
                || event.code === "KeyA"
                || event.code === "ArrowDown"
                || event.code === "KeyS"
                || event.code === "ArrowUp"
                || event.code === "KeyW"
            ) {
                dispatch(gameplayActions.playerMove(event.code as PlayerMoveKeys));
            }
        }
    };

    return (
        <div className="w-full h-full" onKeyDown={keyDownListener} tabIndex={0} ref={divRef}>
            <Hud />
            <Maze player={<Player />}/>
            <GameDialogs />
        </div>
    );
}

export default Game;