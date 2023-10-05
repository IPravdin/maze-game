import MenuView from "./MenuView";
import {Dispatch, SetStateAction, useState} from "react";
import routerLinks from "../../router-links";
import {Link, useNavigate} from "react-router-dom";
import {MenuStateType} from "../../pages/Menu";
import Dialog from "../Dialog";
import {useDispatch, useSelector} from "react-redux";
import {gameReset} from "../../store/slices/game-reset";
import {RootState} from "../../store";
import {gameplayActions} from "../../store/slices/gameplay";
import { playerActions } from '../../store/slices/player';

export default function MenuContent({
  startTitle = false,
  setMenuState
}: {
  startTitle?: boolean,
  setMenuState: Dispatch<SetStateAction<MenuStateType>>
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { firstLaunch } = useSelector((state: RootState) => state.gameplay);
  const { character } = useSelector((state: RootState) => state.player.params);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <>
      <MenuView
        startTitle={startTitle}
        content={
          <>
            {/*@ts-ignore*/}
            <div className="flex gap-2 items-center justify-center">
              <label className={`cursor-pointer border-2 box-border ${ character === 'male' ? 'border-white' : 'border-transparent'}`}>
                <input
                  className="opacity-0 fixed"
                  type="radio"
                  value="male"
                  name="character"
                  checked={character === 'male'}
                  onChange={() => {
                    dispatch(playerActions.changeCharacter('male'));
                  }}
                />
                <img className="w-28 h-28" src="/player/male/player-b.png" alt="male-character-select" />
              </label>
              <label className={`cursor-pointer border-2 box-border ${ character === 'female' ? 'border-white' : 'border-transparent'}`}>
                <input
                  className="opacity-0 fixed"
                  type="radio"
                  value="female"
                  name="character"
                  checked={character === 'female'}
                  onChange={() => {
                    dispatch(playerActions.changeCharacter('female'));
                  }}
                />
                <img className="w-28 h-28" src="/player/female/player-b.png" alt="female-character-select" />
              </label>
            </div>
            <Link className="w-full" to={routerLinks.game}>
              <button className="btn btn-primary w-full" onClick={() => dispatch(gameplayActions.setFirstLaunchOff())}>
                {firstLaunch ? "Start New Game" : "Continue"}
              </button>
            </Link>
            {!firstLaunch && (
              <button className="btn" onClick={() => setConfirmReset(true)}>New Game</button>
            )}
            <button className="btn" onClick={() => setMenuState('options')}>Options</button>
            <button className="btn" onClick={() => setMenuState('stats')}>Statistics</button>
            <button className="btn" onClick={() => setMenuState('credits')}>Credits</button>
          </>
        }
      />
      <Dialog
        id="confirm-game-reset"
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset a game"
        content="Are you sure you would like to reset all progress? All statisctics will be lost as well"
        btnSuccess="No"
        btnError="Yes"
        onErrorClick={() => {
          // @ts-ignore
          dispatch(gameReset());
          setTimeout(() => navigate(routerLinks.game), 10);
        }}
      />
    </>
  );
}