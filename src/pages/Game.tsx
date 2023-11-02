import Player from "../components/maze/Player";
import React, { useEffect, useRef } from 'react';
import Hud from "../components/game/Hud";
import Maze from "../components/maze/Maze";
import { PlayerDataJsonType, PlayerMoveKeys } from '../utils/types/player';
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, AppThunkDispatch, RootState } from '../store';
import {gameplayActions} from "../store/slices/gameplay";
import { assignMazeDataToReducers, resize } from '../store/thunks';
import { objectsEqual, positionToCoord } from '../utils/helpers';
import {playerActions} from "../store/slices/player";
import {useSoundPlayer} from "../utils/hooks/useSoundPlayer";
import {statsActions} from "../store/slices/stats";
import GameDialogs from '../components/game/GameDialogs';
import useMediaQueryHeight from '../utils/hooks/useMediaQueryHeight';
import { HeightBreakpoints } from '../utils/enums/breakpoints';
import Tutorial from '../components/tutorial/Tutorial';

const Game = () => {
    const dispatch: AppDispatch = useDispatch();
    const thunkDispatch: AppThunkDispatch = useDispatch();
    const gameplay = useSelector((state: RootState) => state.gameplay);
    const player = useSelector((state: RootState) => state.player);
    const enemies = useSelector((state: RootState) => state.enemies);
    const maze = useSelector((state: RootState) => state.maze);
    const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);

    const divRef = useRef<HTMLDivElement>(null);
    const soundPlayer = useSoundPlayer();
    
    const sm = useMediaQueryHeight(HeightBreakpoints.sm);
    const md = useMediaQueryHeight(HeightBreakpoints.md);
    const lg = useMediaQueryHeight(HeightBreakpoints.lg);

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
        thunkDispatch(assignMazeDataToReducers());
    }, [thunkDispatch, maze.params, maze.data.startCoord, maze.data.enemies]);
    
    // ** Resizes maze
    useEffect(() => {
        if (sm) {
            thunkDispatch(resize({ width: 450, height: 450 }));
        }
        
        if (md) {
            thunkDispatch(resize({ width: 700, height: 700 }));
        }
        
        if (lg) {
            thunkDispatch(resize({ width: 1000, height: 1000 }));
        }
    }, [sm, md, lg]);

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
            <Tutorial />
        </div>
    );
}

export default Game;