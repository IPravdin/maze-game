import Player from "../layouts/components/maze/Player";
import React, { useEffect, useRef, useState } from "react";
import GameStateDialog from "../layouts/components/game/GameStateDialog";
import Hud from "../layouts/components/game/Hud";
import Maze from "../layouts/components/game/Maze";
import {PlayerMoveKeys} from "../types/player";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState } from "../store";
import {keyboardActions} from "../store/slices/keyboard";
import {enemiesActions} from "../store/slices/enemies";
import {initialMazeFetch} from "../store/slices/initial-maze-fetch";
import Spinner from "../layouts/components/Spinner";

const Game = () => {
    const dispatch: AppDispatch = useDispatch();
    const keyboard = useSelector((state: RootState) => state.keyboard);
    const player = useSelector((state: RootState) => state.player);
    const enemies = useSelector((state: RootState) => state.enemies);

    const divRef = useRef<HTMLDivElement>(null)

    const [openFinish, setOpenFinish] = useState(false)

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef])

    // ** Maintains same start data for Reducers
    useEffect(() => {
        dispatch(initialMazeFetch());
    }, [dispatch]);

    const keyDownListener = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (
            "ArrowRight" || "KeyD"
            || "ArrowLeft" || "KeyA"
            || "ArrowDown" || "KeyS"
            || "ArrowUp" || "KeyW"
        ) {
            dispatch(keyboardActions.playerMove(event.code as PlayerMoveKeys));
        }

        if (event.code === "Escape") {
            dispatch(keyboardActions.pause);
        }
    };

    if (!player.data && !enemies.data) {
        return <Spinner />
    }

    return (
        <div className="w-full h-full" onKeyDown={keyDownListener} tabIndex={0} ref={divRef}>
            <Hud />
            <Maze player={<Player/>}/>
            <GameStateDialog
                id="finish_modal"
                title="Congrats"
                text="That's fast"
                open={openFinish}
                onOpen={() => dispatch(enemiesActions.freezeEnemies())}
                onClose={() => {
                    dispatch(enemiesActions.unfreezeEnemies())
                    setOpenFinish(false)
                }}
            />
            <GameStateDialog
                open={keyboard.pause}
                id="pause_modal"
                title="Pause"
                text="Close modal to continue"
                onOpen={() => dispatch(enemiesActions.freezeEnemies())}
                onClose={() => {
                    dispatch(enemiesActions.unfreezeEnemies())
                    dispatch(keyboardActions.pause)
                }}
            />
        </div>
    )
}

export default Game;