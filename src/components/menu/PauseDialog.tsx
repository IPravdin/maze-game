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
import { RootState } from '../../store';
import PauseContent from './PauseContent';

const PauseDialog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const [menuState, setMenuState] = useState<MenuStateType>('menu');
  const [confirmLeave, setConfirmLeave] = useState(false);
  
  let content = <PauseContent setMenuState={setMenuState} triggerConfirmLeave={setConfirmLeave}/>;
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
        open={gameplay.frozenMode === 'pause'}
        id='pause_modal'
        content={content}
        onClose={() => dispatch(gameplayActions.unfroze())}
      />
      <Dialog
        id='confirm-game-leave'
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        title='Leave Game'
        content='Are you sure you would like to leave a game? Your progress is saved only when a new level is loaded.'
        btnSuccess='No'
        btnError='Yes'
        onErrorClick={() => navigate(routerLinks.menu)}
      />
    </>
  );
};

export default PauseDialog;