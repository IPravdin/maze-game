import React, { useState } from 'react';
import OptionsContent from './OptionsContent';
import routerLinks from '../../router-links';
import { useNavigate } from 'react-router-dom';
import Dialog from '../Dialog';
import { MenuStateType } from '../../pages/Menu';
import CreditsContent from './CreditsContent';
import StatsContent from './StatsContent';
import { gameplayActions } from '../../store/slices/gameplay';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../../store';
import PauseContent from './PauseContent';
import { gameReset } from '../../store/thunks';

const PauseDialog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch: AppThunkDispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const [menuState, setMenuState] = useState<MenuStateType>('menu');
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  
  let content = (
    <PauseContent
      setMenuState={setMenuState}
      triggerConfirmLeave={setConfirmLeave}
      triggerConfirmReset={setConfirmReset}
    />
  );
  
  switch (menuState) {
    case 'credits':
      content = <CreditsContent setMenuState={setMenuState}/>;
      break;
    case 'stats':
      content = <StatsContent setMenuState={setMenuState}/>;
      break;
    case 'options':
      content = <OptionsContent setMenuState={setMenuState}/>;
      break;
  }
  
  return (
    <>
      <Dialog
        enableEscape
        open={gameplay.frozenMode === 'pause'}
        id='pause_modal'
        content={content}
        onClose={() => {
          dispatch(gameplayActions.unfroze());
          setMenuState('menu');
        }}
      />
      <Dialog
        id='confirm-game-leave'
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        title='Go to Main Menu'
        content='Are you sure you would like to leave a game? Your progress is saved only when a new level is loaded.'
        btnSuccess='No'
        btnError='Yes'
        onErrorClick={() => navigate(routerLinks.menu)}
      />
      <Dialog
        id='confirm-game-reset'
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title='Start New Game'
        content='Are you sure you would like to start new game? All progress will be lost. You will be able to see it in the Statistics.'
        btnSuccess='No'
        btnError='Yes'
        onErrorClick={() => {
          thunkDispatch(gameReset());
          setTimeout(() => window.location.reload() , 10);
        }}
      />
    </>
  );
};

export default PauseDialog;