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
import { playerActions } from '../../store/slices/player';
import { statsActions } from '../../store/slices/stats';

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
          const timeout = setTimeout(() => navigate(routerLinks.game), 10);
          clearTimeout(timeout);
        }}
      />
    </>
  );
}

function CharacterSelect() {
  const dispatch = useDispatch();
  const { character } = useSelector((state: RootState) => state.player.params);
  return (
    <div className='flex gap-2 items-center justify-center'>
      <label
        className={`cursor-pointer border-2 box-border ${character === 'male' ? 'border-white' : 'border-transparent'}`}>
        <input
          className='opacity-0 fixed'
          type='radio'
          value='male'
          name='character'
          checked={character === 'male'}
          onChange={() => {
            dispatch(playerActions.changeCharacter('male'));
          }}
        />
        <img className='w-28 h-28' src='/player/male/player-b.png' alt='male-character-select'/>
      </label>
      <label
        className={`cursor-pointer border-2 box-border ${character === 'female' ? 'border-white' : 'border-transparent'}`}>
        <input
          className='opacity-0 fixed'
          type='radio'
          value='female'
          name='character'
          checked={character === 'female'}
          onChange={() => {
            dispatch(playerActions.changeCharacter('female'));
          }}
        />
        <img className='w-28 h-28' src='/player/female/player-b.png' alt='female-character-select'/>
      </label>
    </div>
  );
}

function NameInput() {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.stats);
  
  return (
    <div className='flex items-center justify-center'>
      <div className='flex gap-2'>
        <label className='label label-text'>
          Hi! How can I call you?
        </label>
        <input
          defaultValue={stats.current.name}
          type='text'
          placeholder={stats.current.name}
          className='input input-bordered max-w-xs'
          onBlur={(e) => {
            const newName = e.target.value;
            if (newName) dispatch(statsActions.changeName(newName));
          }}
        />
      </div>
    </div>
  );
}