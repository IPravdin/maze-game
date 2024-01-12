import MenuView from './MenuView';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { MenuStateType } from '../../pages/Menu';
import { AppThunkDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { gameReset } from '../../store/thunks';
import Dialog from '../Dialog';

export default function PauseContent({
  setMenuState,
  triggerConfirmLeave
}: {
  setMenuState: Dispatch<SetStateAction<MenuStateType>>,
  triggerConfirmLeave: Dispatch<SetStateAction<boolean>>
}) {
  const thunkDispatch: AppThunkDispatch = useDispatch();
  const { pauseExpanded } = useSelector((state: RootState) => state.gameplay);
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <>
      <MenuView
        title='Pause'
        content={
          <>
            <button className='btn btn-primary'>Continue</button>
            {/*<button className="btn" onClick={() => {
                            dispatch(mazeActions.generate());
                            dispatch(gameplayActions.unfroze());
                        }}>
                            Restart Level
                        </button>*/}
            <button type='button' className='btn' onClick={() => setMenuState('options')}>Options</button>
            
            {!pauseExpanded && <button className='btn' onClick={() => triggerConfirmLeave(true)}>Go to Main Menu</button>}
            {pauseExpanded && (
              <>
                <button className='btn' onClick={() => setMenuState('customization')}>Customization</button>
                <button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
                <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>
                <button className='btn' onClick={() => setConfirmReset(true)}>Start New Game</button>
              </>
            )}
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
          setTimeout(() => window.location.reload() , 10);
        }}
      />
    </>
  );
}