import MenuView from './MenuView';
import { Dispatch, SetStateAction, useState } from 'react';
import routerLinks from '../../router-links';
import { Link, useNavigate } from 'react-router-dom';
import { MenuStateType } from '../../pages/Menu';
import Dialog from '../Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { gameReset } from '../../store/thunks';
import { AppDispatch, AppThunkDispatch, RootState } from '../../store';
import { gameplayActions } from '../../store/slices/gameplay';
import NameInput from './NameInput';
import CharacterSelect from './CharacterSelect';

export default function MenuContent({
  startTitle = false,
  setMenuState
}: {
  startTitle?: boolean,
  setMenuState: Dispatch<SetStateAction<MenuStateType>>
}) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const thunkDispatch: AppThunkDispatch = useDispatch();
  const { firstLaunch } = useSelector((state: RootState) => state.gameplay);
  const [confirmReset, setConfirmReset] = useState(false);
  
  return (
    <>
      <MenuView
        startTitle={startTitle}
        content={
          <>
            <NameInput/>
            <CharacterSelect/>
            <Link className='w-full' to={routerLinks.game}>
              <button className='btn btn-primary w-full' onClick={() => dispatch(gameplayActions.setFirstLaunchOff())}>
                {firstLaunch ? 'Start New Game' : 'Continue'}
              </button>
            </Link>
            {!firstLaunch && (
              <button className='btn' onClick={() => setConfirmReset(true)}>New Game</button>
            )}
            <button className='btn' onClick={() => setMenuState('options')}>Options</button>
            <button className='btn' onClick={() => setMenuState('stats')}>Statistics</button>
            <button className='btn' onClick={() => setMenuState('credits')}>Credits</button>
          </>
        }
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
          setTimeout(() => navigate(routerLinks.game), 10);
        }}
      />
    </>
  );
}