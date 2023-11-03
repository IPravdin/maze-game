import { useNavigate } from 'react-router-dom';
import routerLinks from '../router-links';
import { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { useSoundPlayer } from '../utils/hooks/useSoundPlayer';
import useMediaQueryHeight from '../utils/hooks/useMediaQueryHeight';
import { HeightBreakpoints } from '../utils/enums/breakpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TitleScreen = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const soundPlayer = useSoundPlayer();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  
  const [padding, setPadding] = useState(0);
  const sm = useMediaQueryHeight(HeightBreakpoints.sm);
  const md = useMediaQueryHeight(HeightBreakpoints.md);
  const lg = useMediaQueryHeight(HeightBreakpoints.lg);
  
  // ** Sets focus on main div
  useEffect(() => {
    if (!ref) return;
    ref.current?.focus();
  }, [ref]);
  
  useEffect(() => {
    if (!gameplay.titleScreen) {
      navigate(routerLinks.menu);
    }
  }, [gameplay.titleScreen, navigate]);
  
  function keyDownHandler(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();
    let mutiplicator = 1;
    
    if (sm) mutiplicator = 1;
    if (md) mutiplicator = 2;
    if (lg) mutiplicator = 3;
    
    if (e.code === 'Space') {
      soundPlayer.play('teleport');
      setInterval(() => setPadding((prevState) => prevState + 1.2), 12.5);
      setTimeout(() => navigate(routerLinks.menu), 1250 * mutiplicator);
    }
  }
  
  return (
    <div
      className='w-full h-full flex flex-col justify-center items-center'
      tabIndex={0}
      ref={ref}
      onKeyDown={keyDownHandler}
    >
      <div
        className='flex justify-center'
        style={{
          paddingTop: padding,
          paddingBottom: padding,
        }}
      >
        <AnimatedTitle/>
      </div>
      <div
        className='flex justify-center'
        style={{
          paddingTop: padding,
          paddingBottom: padding,
        }}
      >
        <div className='flex gap-3 text-3xl animate-pulse'>
          press
          <kbd className='kbd kbd-md'>space</kbd>
          to start
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;