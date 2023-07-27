import Player from "../layouts/components/maze/Player";
import React, { useEffect, useRef } from "react";
import GameStateDialog from "../layouts/components/game/GameStateDialog";
import Hud from "../layouts/components/game/Hud";
import Maze from "../layouts/components/game/Maze";
import {PlayerMoveKeys} from "../types/player";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState } from "../store";
import {keyboardActions} from "../store/slices/keyboard";
import {initialMazeFetch} from "../store/slices/initial-maze-fetch";
import Spinner from "../layouts/components/Spinner";
import {coordToPosition, objectsEqual} from "../helpers";
import {PlayerDataJsonType} from "../data/PlayerData";
import {playerActions} from "../store/slices/player";

const Game = () => {
    const dispatch: AppDispatch = useDispatch();
    const keyboard = useSelector((state: RootState) => state.keyboard);
    const player = useSelector((state: RootState) => state.player);
    const enemies = useSelector((state: RootState) => state.enemies);
    const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);

    const divRef = useRef<HTMLDivElement>(null)

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef, player.data])

    // ** Maintains same start data for Reducers
    useEffect(() => {
        dispatch(initialMazeFetch());
    }, [dispatch]);

    // ** Kills Player
    useEffect(() => {
        if (!enemies.data.enemiesCurCoords) return;
        if (!player.data) return;
        if (!player.data?.alive) return;

        const clashed: boolean = !!enemies.data.enemiesCurCoords.find((enemyCoord) => objectsEqual(coordToPosition(enemyCoord, cellSize), (player.data as PlayerDataJsonType).currentPosition)) ?? false;
        if (clashed) {
            dispatch(playerActions.kill());
            dispatch(keyboardActions.froze('lost'));
        }
    }, [player.data?.currentPosition, enemies.data.enemiesCurCoords])

    const keyDownListener = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (event.code === "Escape") {
            dispatch(keyboardActions.froze('pause'));
        }

        if (!keyboard.frozen && player.data?.alive) {
            if (event.code === "ArrowRight"
                || event.code === "KeyD"
                || event.code === "ArrowLeft"
                || event.code === "KeyA"
                || event.code === "ArrowDown"
                || event.code === "KeyS"
                || event.code === "ArrowUp"
                || event.code === "KeyW"
            ) {
                dispatch(keyboardActions.playerMove(event.code as PlayerMoveKeys));
            }
        }
    };

    if (!player.data) {
        return <Spinner />
    }

    return (
        <div className="w-full h-full" onKeyDown={keyDownListener} tabIndex={0} ref={divRef}>
            <Hud />
            <Maze player={<Player/>}/>
            <GameStateDialog
                open={keyboard.frozenMode === 'won'}
                id="finish_modal"
                title="Congrats"
                text="That's fast"
                onClose={() => dispatch(keyboardActions.unfroze())}
            />
            <GameStateDialog
                open={keyboard.frozenMode === 'lost'}
                id="lost_modal"
                title="Looser"
                text="Total Looser"
                onClose={() => dispatch(keyboardActions.unfroze())}
            />
            <GameStateDialog
                open={keyboard.frozenMode === 'pause'}
                id="pause_modal"
                title="Pause"
                text="Close modal to continue"
                onClose={() => dispatch(keyboardActions.unfroze())}
            />
        </div>
    )
}

export default Game;