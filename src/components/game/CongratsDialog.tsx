import { StatCard } from '../StatCard';
import { Skull } from 'lucide-react';
import { returnBonusCollectionRate } from '../../utils/helpers';
import { SvgBonus } from '../../assets/icons/bonus';
import { statsActions } from '../../store/slices/stats';
import { mazeActions } from '../../store/slices/maze';
import { gameplayActions } from '../../store/slices/gameplay';
import Dialog from '../Dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Spinner from '../Spinner';

export default function CongratsDialog() {
  const dispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const player = useSelector((state: RootState) => state.player);
  const maze = useSelector((state: RootState) => state.maze);
  
  if (!player.data) {
    return <Spinner />
  }
  
  function onOpen() {
    dispatch(statsActions.recordLevel());
    dispatch(statsActions.addBonusesCollected(player.data?.collectedBonuses ?? 0));
    dispatch(statsActions.addBonusesTotal(maze.params.bonuses));
    dispatch(statsActions.addStepsWalked(player.data?.stepsWalked ?? 0));
  }
  
  function onClose() {
    dispatch(statsActions.addLevelToTotalDeath());
    dispatch(mazeActions.generateNext());
    dispatch(gameplayActions.unfroze());
  }
  
  return (
    <Dialog
      open={gameplay.frozenMode === 'won'}
      id="finish_modal"
      title="Congrats!"
      content={<StatCards />}
      onOpen={onOpen}
      onClose={onClose}
      btnSuccess="Next level"
    />
  );
}

function StatCards() {
  const stats = useSelector((state: RootState) => state.stats);
  const { bonuses: mazeBonuses, enemies: mazeEnemies } = useSelector((state: RootState) => state.maze.params);
  const { collectedBonuses: playerBonuses } = useSelector((state: RootState) => state.player.data!);
  
  const levelStatsText = "Your level statistics is";
  const text = `You've made it. You've completed ${stats.current.levelsCompleted} level.`;
  
  return (
    <>
      <p>{text} {mazeBonuses || mazeEnemies ? levelStatsText : ''}</p>
      {(!!mazeBonuses || !!mazeEnemies) &&
        <ul className='stats shadow'>
          {!!mazeEnemies && <StatCard title={'Killed'} value={stats.current.playerLevelDeath.toString()} icon={<Skull/>}/>}
          {!!mazeBonuses &&
            <StatCard
              title={'Bonus Collection Rate'}
              value={returnBonusCollectionRate(playerBonuses, mazeBonuses).toLocaleString('en-US', { style: 'percent' })}
              desc={'You\'ve collected ' + playerBonuses + ' out of ' + mazeBonuses + ' bonuses'}
              icon={<SvgBonus width={48} height={48}/>}
            />
          }
        </ul>
      }
    </>
  );
}