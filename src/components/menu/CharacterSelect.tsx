import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { playerActions } from '../../store/slices/player';

export default function CharacterSelect() {
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