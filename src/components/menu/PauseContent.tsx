import MenuView from './MenuView';
import React, { Dispatch, SetStateAction } from 'react';
import { MenuStateType } from '../../pages/Menu';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

export default function PauseContent({
  setMenuState,
  triggerConfirmLeave,
  triggerConfirmReset
}: {
  setMenuState: Dispatch<SetStateAction<MenuStateType>>,
  triggerConfirmLeave: Dispatch<SetStateAction<boolean>>,
  triggerConfirmReset: Dispatch<SetStateAction<boolean>>,
}) {
  const { pauseExpanded } = useSelector((state: RootState) => state.gameplay);
  
  return (
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
              <button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
              <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>
              <button className='btn' onClick={() => triggerConfirmReset(true)}>Start New Game</button>
            </>
          )}
        </>
      }
    />
  );
}