import Player from "../layouts/components/maze/Player";
import React, {useEffect, useRef, useState} from "react";
import GameStateDialog from "../layouts/components/game/GameStateDialog";
import Hud from "../layouts/components/game/Hud";
import Maze from "../layouts/components/game/Maze";
import {PlayerMoveKeys} from "../utils/types/player";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState } from "../store";
import {gameplayActions} from "../store/slices/gameplay";
import {mazeFetch} from "../store/slices/maze-fetch";
import Spinner from "../layouts/components/Spinner";
import { objectsEqual, positionToCoord} from "../utils/helpers";
import {PlayerDataJsonType} from "../data/PlayerData";
import {playerActions} from "../store/slices/player";
import Pause from "../layouts/menu/Pause";
import {mazeActions} from "../store/slices/maze";
import {useSoundPlayer} from "../utils/hooks/useSoundPlayer";
import routerLinks from "../router-links";
import {useNavigate} from "react-router-dom";
import {statsActions} from "../store/slices/stats";

const Game = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const gameplay = useSelector((state: RootState) => state.gameplay);
    const player = useSelector((state: RootState) => state.player);
    const enemies = useSelector((state: RootState) => state.enemies);
    const maze = useSelector((state: RootState) => state.maze);
    const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);

    const divRef = useRef<HTMLDivElement>(null);
    const soundPlayer = useSoundPlayer();
    const [enemySoundTriggered, setEnemySoundTriggered] = useState(false);

    useEffect(() => {
        if (gameplay.frozenMode === 'none') {
            soundPlayer.play('main');
        }
    }, [gameplay.frozenMode])

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
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
            dispatch(statsActions.recordDeath());
            dispatch(gameplayActions.froze('lost'));
            soundPlayer.play('death');
        }
    }, [player.data?.currentPosition, enemies.data.enemiesCurCoords]);

    // ** Trigger enemy sound
    useEffect(() => {
        if (!enemies.data.enemiesCurCoords) return;
        if (!player.data) return;

        const playerPos = positionToCoord((player.data as PlayerDataJsonType).currentPosition, cellSize);

        maze.data.enemies.forEach((enemy) => {
            return enemy.movement.forEach((side) => {
                return side.forEach((cell) => {
                    if (objectsEqual(playerPos, cell)) {
                        return setEnemySoundTriggered( true);
                    }
                })
            })
        });

    }, [player.data?.currentPosition]);

    // ** Produce Enemy Sound
    useEffect(() => {
        if (enemySoundTriggered) {
            soundPlayer.play('enemy');
            setEnemySoundTriggered(false);
        }
    }, [enemySoundTriggered, soundPlayer])

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

    if (!player.data) {
        return <Spinner />
    }

    return (
        <div className="w-full h-full" onKeyDown={keyDownListener} tabIndex={0} ref={divRef}>
            <Hud />
            <Maze player={<Player/>}/>
            <GameStateDialog
                open={gameplay.frozenMode === 'won'}
                id="finish_modal"
                title="Congrats"
                content={
                    <>
                        <p>You've collected {player.data.collectedBonuses} out of {maze.params.bonuses}.</p>
                        <p>For this you stepped {player.data.stepsWalked} times</p>
                    </>
                }
                onClose={() => {
                    dispatch(statsActions.recordLevel());
                    dispatch(statsActions.addBonusesCollected(player.data?.collectedBonuses ?? 0));
                    dispatch(statsActions.addBonusesTotal(maze.params.bonuses));
                    dispatch(statsActions.addStepsWalked(player.data?.stepsWalked ?? 0));
                    dispatch(mazeActions.generateNext());
                    dispatch(gameplayActions.unfroze());
                }}
                btnSuccess="Next level"
            />
            <GameStateDialog
                open={gameplay.frozenMode === 'lost'}
                id="lost_modal"
                title="Looser"
                content={<p className="py-4">Ups... Do you wanna try again?</p>}
                btnSuccess="One more try"
                btnError="Leave Game"
                onSuccessClick={() => {
                    dispatch(mazeActions.generateOneMore());
                    // @ts-ignore
                    dispatch(mazeFetch());
                    dispatch(gameplayActions.unfroze());
                }}
                onErrorClick={() => {
                    dispatch(mazeActions.generateOneMore());
                    dispatch(gameplayActions.unfroze());
                    navigate(routerLinks.menu);
                }}
            />
            <GameStateDialog
                open={gameplay.frozenMode === 'pause'}
                id="pause_modal"
                content={<Pause />}
                onClose={() => dispatch(gameplayActions.unfroze())}
            />
        </div>
    )
}

export default Game;