import Player from "../layouts/components/maze/Player";
import React, { useEffect, useRef } from "react";
import GameStateDialog from "../layouts/components/game/GameStateDialog";
import Hud from "../layouts/components/game/Hud";
import Maze from "../layouts/components/game/Maze";
import {PlayerMoveKeys} from "../types/player";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState } from "../store";
import {keyboardActions} from "../store/slices/keyboard";
import {mazeFetch} from "../store/slices/maze-fetch";
import Spinner from "../layouts/components/Spinner";
import { objectsEqual, positionToCoord} from "../helpers";
import {PlayerDataJsonType} from "../data/PlayerData";
import {playerActions} from "../store/slices/player";
import Pause from "../layouts/menu/Pause";
import {mazeActions} from "../store/slices/maze";

const Game = () => {
    const dispatch: AppDispatch = useDispatch();
    const keyboard = useSelector((state: RootState) => state.keyboard);
    const player = useSelector((state: RootState) => state.player);
    const enemies = useSelector((state: RootState) => state.enemies);
    const maze = useSelector((state: RootState) => state.maze);
    const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);

    const divRef = useRef<HTMLDivElement>(null)

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef, player.data])

    // ** Maintains same start data for Reducers
    useEffect(() => {
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
                content={<p className="py-4">That's fast</p>}
                onClose={() => {
                    dispatch(mazeActions.generateNext());
                    dispatch(keyboardActions.unfroze());
                }}
                btnSuccess="Next level"
            />
            <GameStateDialog
                open={keyboard.frozenMode === 'lost'}
                id="lost_modal"
                title="Looser"
                content={<p className="py-4">Total Looser</p>}
                onClose={() => {
                    dispatch(mazeActions.generate());
                    dispatch(keyboardActions.unfroze());
                    dispatch(playerActions.revive())
                }}
                btnSuccess="Start again"
            />
            <GameStateDialog
                open={keyboard.frozenMode === 'pause'}
                id="pause_modal"
                title="Pause"
                content={<Pause />}
                onClose={() => dispatch(keyboardActions.unfroze())}
                btnSuccess="Continue"
            />
        </div>
    )
}

export default Game;