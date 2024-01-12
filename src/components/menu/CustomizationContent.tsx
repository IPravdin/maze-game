import { Dispatch, SetStateAction } from 'react';
import { MenuStateType } from '../../pages/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MenuView from './MenuView';
import NameInput from './NameInput';
import CharacterSelect from './CharacterSelect';

export default function CustomizationContent({
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
      title='Customization'
      content={
        <>
          <p>{current.name}, here you can change your name and appearance</p>
          <CharacterSelect />
          <NameInput />
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