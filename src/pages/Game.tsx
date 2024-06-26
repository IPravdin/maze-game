import Player from '../components/maze/Player';
import React, { useEffect, useRef, useState } from 'react';
import Hud from '../components/game/Hud';
import Maze from '../components/maze/Maze';
import { PlayerDataJsonType, PlayerMoveKeys } from '../utils/types/player';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppThunkDispatch, RootState } from '../store';
import { gameplayActions } from '../store/slices/gameplay';
import { assignMazeDataToReducers, resize } from '../store/thunks';
import { objectsEqual, positionToCoord } from '../utils/helpers';
import { playerActions } from '../store/slices/player';
import { useSoundPlayer } from '../utils/hooks/useSoundPlayer';
import { statsActions } from '../store/slices/stats';
import GameDialogs from '../components/game/GameDialogs';
import useMediaQueryHeight from '../utils/hooks/useMediaQueryHeight';
import { HeightBreakpoints } from '../utils/enums/breakpoints';
import Tutorial from '../components/tutorial/Tutorial';

const Game = () => {
  const dispatch: AppDispatch = useDispatch();
  const thunkDispatch: AppThunkDispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const player = useSelector((state: RootState) => state.player);
  const maze = useSelector((state: RootState) => state.maze);
  
  const divRef = useRef<HTMLDivElement>(null);
  const soundPlayer = useSoundPlayer();
  
  const [soundPlayerTriggered, setSoundPlayerTriggered] = useState(false);
  
  const xs = useMediaQueryHeight(HeightBreakpoints.xs);
  const sm = useMediaQueryHeight(HeightBreakpoints.sm);
  const md = useMediaQueryHeight(HeightBreakpoints.md);
  const lg = useMediaQueryHeight(HeightBreakpoints.lg);
  const xl = useMediaQueryHeight(HeightBreakpoints.xl);
  
  useEffect(() => {
    if (gameplay.frozenMode === 'none' || soundPlayerTriggered || soundPlayer.musicVolume) {
      soundPlayer.play('main');
    }
  }, [gameplay.frozenMode, soundPlayerTriggered, !!soundPlayer.musicVolume]);
  
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
    if (xs) {
      thunkDispatch(resize({ width: 490, height: 490 }));
    }
    
    if (sm) {
      thunkDispatch(resize({ width: 600, height: 600 }));
    }
    
    if (md) {
      thunkDispatch(resize({ width: 700, height: 700 }));
    }
    
    if (lg) {
      thunkDispatch(resize({ width: 850, height: 850 }));
    }
    
    if (xl) {
      thunkDispatch(resize({ width: 1000, height: 1000 }));
    }
  }, [xs, sm, md, lg, xl]);
  
  const keyDownListener = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (gameplay.frozenMode === 'none' && event.code === 'Escape') {
      dispatch(gameplayActions.froze('pause'));
    }
    
    if (!gameplay.frozen && player.data?.alive) {
      if (event.code === 'ArrowRight'
        || event.code === 'KeyD'
        || event.code === 'ArrowLeft'
        || event.code === 'KeyA'
        || event.code === 'ArrowDown'
        || event.code === 'KeyS'
        || event.code === 'ArrowUp'
        || event.code === 'KeyW'
      ) {
        dispatch(playerActions.setPlayerMoveDir(event.code as PlayerMoveKeys));
      }
    }
  };
  
  return (
    <div className='w-full h-full' onKeyDown={keyDownListener} tabIndex={0} ref={divRef}>
      <Hud/>
      <Maze player={<Player/>}/>
      <GameDialogs/>
      <Tutorial onTutorialDialogKeyDown={() => setSoundPlayerTriggered(true)}/>
    </div>
  );
};

export default Game;