import MenuView from './MenuView';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { MenuStateType } from '../../pages/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Skull, Trophy } from 'lucide-react';
import { SvgBonus } from '../../assets/icons/bonus';
import { returnBonusCollectionRate } from '../../utils/helpers';
import { StatCard } from '../StatCard';

export default function StatsContent({
  startTitle = false,
  setMenuState
}: {
  startTitle?: boolean,
  setMenuState: Dispatch<SetStateAction<MenuStateType>>
}) {
  const { current } = useSelector((state: RootState) => state.stats);
  
  return (
    <MenuView
      startTitle={startTitle}
      title='Statistics'
      content={
        <>
          <p>{current.name}, here you can view your current achievements</p>
          <StatsBlock
            levelsCompleted={current.levelsCompleted.toString()}
            killed={current.playerTotalDeath.toString()}
            bonusesCollected={current.bonusesCollected}
            bonusesTotal={current.bonusesTotal}
          />
          <StatsHistoryContent/>
        </>
      }
      cardActions={
        <>
          <button className='btn' onClick={() => setMenuState('menu')}>
            Back
          </button>
        </>
      }
    />
  );
}

function StatsHistoryContent() {
  const stats = useSelector((state: RootState) => state.stats);
  const [open, setOpen] = useState(false);
  
  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input
        className='cursor-pointer'
        type='radio'
        name='history'
        checked={open}
        onClick={() => setOpen((prevState) => !prevState)}
        /*To satisfy the requirement for checked prop*/
        onChange={() => console.log()}
      />
      <h1 className='collapse-title text-2xl font-medium'>
        Last Play Sessions
      </h1>
      <div className='collapse-content overflow-auto w-full max-h-40'>
        <p>Here you can find statistics about local top 5 games.</p>
        {!stats.history.length && <p className='text-center'>Right now you don't have any past games.</p>}
        {!!stats.history.length && stats.history.map((record, index) => (
          <Fragment key={index}>
            <h2 className='text-xl text-left px-8 pt-2'>#{index + 1} {record.name}</h2>
            <StatsBlock
              levelsCompleted={record.levelsCompleted.toString()}
              killed={record.playerTotalDeath.toString()}
              bonusesCollected={record.bonusesCollected}
              bonusesTotal={record.bonusesTotal}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function StatsBlock({
  levelsCompleted,
  killed,
  bonusesCollected,
  bonusesTotal,
}: {
  levelsCompleted: string,
  killed: string,
  bonusesCollected: number,
  bonusesTotal: number
}) {
  const bonusCollectionRate = returnBonusCollectionRate(bonusesCollected, bonusesTotal) || 0;
  return (
    <ul className='stats'>
      <StatCard title={'Levels completed'} value={levelsCompleted} icon={<Trophy/>}/>
      <StatCard title={'Killed'} value={killed} icon={<Skull/>}/>
      <StatCard
        title={'Bonus Collection Rate'}
        value={bonusCollectionRate.toLocaleString('en-US', { style: 'percent' })}
        desc={'You\'ve collected ' + bonusesCollected + ' out of ' + bonusesTotal + ' bonuses'}
        icon={<SvgBonus width={48} height={48}/>}
      />
    </ul>
  );
}