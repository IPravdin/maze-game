import MenuView from './MenuView';
import React, { Dispatch, SetStateAction } from 'react';
import { MenuStateType } from '../../pages/Menu';

export default function PauseContent({
  setMenuState,
  triggerConfirmLeave
}: {
  setMenuState: Dispatch<SetStateAction<MenuStateType>>,
  triggerConfirmLeave: Dispatch<SetStateAction<boolean>>
}) {
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
          {/*<button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
                        <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>*/}
          <button className='btn' onClick={() => triggerConfirmLeave(true)}>Leave Game</button>
        </>
      }
    />
  );
}