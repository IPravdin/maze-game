import React, {useState} from "react";
import OptionsContent from "./OptionsContent";
import MenuView from "./MenuView";
import routerLinks from "../../router-links";
import {useNavigate} from "react-router-dom";
import Dialog from "../Dialog";
import {MenuStateType} from "../../pages/Menu";
import CreditsContent from "./CreditsContent";
import StatsContent from "./StatsContent";
import { gameplayActions } from '../../store/slices/gameplay';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const PauseDialog = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const [menuState, setMenuState] = useState<MenuStateType>('menu');
  const [confirmLeave, setConfirmLeave] = useState(false);

  switch (menuState) {
    case "credits":
      return (
          <CreditsContent setMenuState={setMenuState} />
      );
    case "stats":
      return (
          <StatsContent setMenuState={setMenuState} />
      );
    case "options":
      return (
          <OptionsContent setMenuState={setMenuState} />
      );
  }

  return (
    <>
      <Dialog
        open={gameplay.frozenMode === 'pause'}
        id="pause_modal"
        content={(
          <MenuView
            title="Pause"
            content={
              <>
                <button className="btn btn-primary">Continue</button>
                {/*<button className="btn" onClick={() => {
                            dispatch(mazeActions.generate());
                            dispatch(gameplayActions.unfroze());
                        }}>
                            Restart Level
                        </button>*/}
                <button className="btn" onClick={() => setMenuState('options')}>Options</button>
                {/*<button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
                        <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>*/}
                <button className="btn" onClick={() => setConfirmLeave(true)}>Leave Game</button>
              </>
            }
          />
        )}
        onClose={() => dispatch(gameplayActions.unfroze())}
      />
      <Dialog
        id="confirm-game-leave"
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        title="Leave Game"
        content="Are you sure you would like to leave a game? Your progress is saved only when a new level is loaded."
        btnSuccess="No"
        btnError="Yes"
        onErrorClick={() => navigate(routerLinks.menu)}
      />
    </>
  );
}

export default PauseDialog;