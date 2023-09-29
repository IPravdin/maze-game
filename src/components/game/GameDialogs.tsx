import Dialog from '../Dialog';
import { StatCard } from '../StatCard';
import { Skull } from 'lucide-react';
import { returnBonusCollectionRate } from '../../utils/helpers';
import { SvgBonus } from '../../assets/icons/bonus';
import { statsActions } from '../../store/slices/stats';
import { mazeActions } from '../../store/slices/maze';
import { gameplayActions } from '../../store/slices/gameplay';
import { mazeFetch } from '../../store/slices/maze-fetch';
import routerLinks from '../../router-links';
import PauseDialog from '../menu/PauseDialog';
import React from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

export default function GameDialogs() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const player = useSelector((state: RootState) => state.player);
  const maze = useSelector((state: RootState) => state.maze);
  const stats = useSelector((state: RootState) => state.stats);
  
  if (!player.data) {
    return <Spinner />
  }
  
  return (
    <>
      <Dialog
        open={gameplay.frozenMode === 'won'}
        id="finish_modal"
        title="Congrats!"
        content={
          <>
            <p>You've made it. You've completed {stats.current.levelsCompleted} level. Your level statistics is</p>
            <ul className="stats shadow">
              <StatCard title={'Your Deaths'} value={stats.current.playerLevelDeath.toString()} icon={<Skull />}/>
              <StatCard
                title={'Bonus Collection Rate'}
                value={returnBonusCollectionRate(player.data.collectedBonuses, maze.params.bonuses).toLocaleString('en-US', { style: 'percent' })}
                desc={"You've collected " + player.data.collectedBonuses + " out of " + maze.params.bonuses + " bonuses"}
                icon={<SvgBonus width={48} height={48} />}
              />
            </ul>
          </>
        }
        onClose={() => {
          dispatch(statsActions.recordLevel());
          dispatch(statsActions.addBonusesCollected(player.data?.collectedBonuses ?? 0));
          dispatch(statsActions.addBonusesTotal(maze.params.bonuses));
          dispatch(statsActions.addStepsWalked(player.data?.stepsWalked ?? 0));
          dispatch(statsActions.addLevelToTotalDeath());
          dispatch(mazeActions.generateNext());
          dispatch(gameplayActions.unfroze());
        }}
        btnSuccess="Next level"
      />
      <Dialog
        open={gameplay.frozenMode === 'lost'}
        id="lost_modal"
        title="Looser"
        content={<p className="py-4">Ups... Do you wanna try again?</p>}
        btnSuccess="One more try"
        btnError="Leave Game"
        onSuccessClick={() => {
          dispatch(mazeActions.generateOneMore());
          // @ts-ignore
          dispatch(mazeFetch());
          dispatch(gameplayActions.unfroze());
        }}
        onErrorClick={() => {
          dispatch(mazeActions.generateOneMore());
          dispatch(gameplayActions.unfroze());
          navigate(routerLinks.menu);
        }}
      />
      <PauseDialog />
    </>
  );
}