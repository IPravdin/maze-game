import { useEffect, useState } from 'react';
import MenuContent from '../components/menu/MenuContent';
import OptionsContent from '../components/menu/OptionsContent';
import CreditsContent from '../components/menu/CreditsContent';
import { useSoundPlayer } from '../utils/hooks/useSoundPlayer';
import StatsContent from '../components/menu/StatsContent';
import routerLinks from '../router-links';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export type MenuStateType = 'options' | 'menu' | 'credits' | 'stats';
const Menu = () => {
  const soundPlayer = useSoundPlayer();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  const navigate = useNavigate();
  const [menuState, setMenuState] = useState<MenuStateType>('menu');
  
  useEffect(() => {
    soundPlayer.play('menu');
  }, []);
  
  useEffect(() => {
    if (!gameplay.menu) {
      navigate(routerLinks.game);
    }
  }, [gameplay.menu, navigate]);
  
  switch (menuState) {
    case 'options':
      return <OptionsContent startTitle={true} setMenuState={setMenuState}/>;
    case 'credits':
      return <CreditsContent startTitle={true} setMenuState={setMenuState}/>;
    case 'stats':
      return <StatsContent startTitle={true} setMenuState={setMenuState}/>;
    default:
      return <MenuContent startTitle={true} setMenuState={setMenuState}/>;
  }
};

export default Menu;