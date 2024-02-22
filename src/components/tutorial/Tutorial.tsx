import TutorialDialog from './TutorialDialog';
import React, { useMemo } from 'react';
import NavigationKbds from '../NavigationKbds';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TutorialType } from '../../utils/types/tutorial';

const tutorialContent: TutorialType[] = [
  {
    introduction: [
      'Hey! Welcome to the tutorial! I will quickly explain the rules of the game.\n They are simple. So, don\'t worry!\n Press space to continue.',
      undefined
    ],
    goal: [
      'Your goal is get to the teleport which will move you to the next level. It\'s pulsating, so you won\'t miss it! 😉',
      undefined
    ],
    movement: [
      'To reach the teleport use the Arrow Keys or WASD. Simple, right?\n Now try to reach it. I will be waiting for you in the next level. 😄',
      (
        <div className='flex justify-center'>
          <NavigationKbds btns={['↑', '←', '↓', '→']}/>
          <div className='divider divider-horizontal before:bg-white after:bg-white'/>
          <NavigationKbds btns={['W', 'A', 'S', 'D']}/>
        </div>
      )
    ]
  },
  {
    bonus: [
      'You managed to get to the teleport! Good job!🥳 In the game you can also collect coins.\n They are not always easily reachable. Sometimes it\'s even impossible to get to them. How lucky are you? 😏',
      undefined
    ]
  },
  {
    enemy: [
      'Another thing I wanted to warn you! There are enemies in the maze 😱.\n They are dangerous, but luckily they are moving only on the certain cells that are marked 😮‍💨.\n You need to stay away from them. Be careful!',
      undefined
    ]
  },
  {
    tired: [
      'Yey! So, a few more things and we will be done with the tutorial 🫠.',
      undefined
    ],
    escape: [
      'In some point of time you will probably want to pause a game 🤔.\n To do so you can simply press ESC button. There you can also modify the volume of sounds and music.',
      <div className='flex justify-center'>
        <kbd className='kbd kbd-lg'>ESC</kbd>
      </div>
    ],
    menu: [
      'From the options, you can go directly to the main menu which you have already seen 😄.\n There you can start a new game, if you feel that the level is boring or too hard.\n Also you can view your statistics for the current game and top five previous once. \n Will you beat your records? 😝',
      undefined
    ],
    customisation: [
      'In the main menu, you can select a character you prefer to play. And please tell us how we can call you 🤩.\n It would be a pleasure to know your nickname. Also It will be used to differentiate play sessions in the statistics.',
      <div className='flex justify-center'>
        <img className='w-28 h-28' src='/player/male/player-b.png' alt='male character'/>
        <div className='divider divider-horizontal before:bg-white after:bg-white'/>
        <img className='w-28 h-28' src='/player/female/player-b.png' alt='female character'/>
      </div>
    ],
    quit: [
      'And lastly, to quit the game you can simply close the tab. Don\'t worry, your progress will be saved 😎.\n And here we are. Hope you will enjoy the game.\n If you need any help just text me in Telegram, WhatsApp, or Viber (my number: +380988500288).\n I will be happy to help you. Good luck!😉',
      undefined
    ]
  }
];

export default function Tutorial({ onTutorialDialogKeyDown }: { onTutorialDialogKeyDown?: () => void}) {
  const level = useSelector((state: RootState) => state.maze.params.level);
  const tutorial = useSelector((state: RootState) => state.gameplay.tutorial);
  
  const content = useMemo(() => {
    if (tutorialContent.length >= level) {
      return tutorialContent[level - 1];
    }
    return undefined;
  }, [level]);
  
  if (tutorial && content) {
    return <TutorialDialog key={level} content={content} onKeyDown={onTutorialDialogKeyDown}/>;
  }
  
  return <></>;
}