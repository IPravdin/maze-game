import TutorialDialog from './TutorialDialog';
import React, { useMemo } from 'react';
import NavigationKbds from '../NavigationKbds';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TutorialType } from '../../utils/types/tutorial';

const tutorialContent: TutorialType[] = [
  {
    introduction: [
      'Hey! Welcome to the tutorial! I will quickly explain the rules of the game.\n They are simple, so don\'t worry!\n Press space to continue.',
      undefined
    ],
    goal: [
      'Your goal is get to the teleport which will move you to the next level. It\'s pulsating, so you won\'t miss it!',
      undefined
    ],
    movement: [
      'To reach the teleport use the Arrow Keys or WASD. Simple, right?\n Now try to get to the teleport. I will be waiting for you in the next level.',
      (
        <div className='flex justify-center'>
          <NavigationKbds btns={['↑', '←', '↓', '→']}/>
          <div className='divider divider-horizontal'/>
          <NavigationKbds btns={['W', 'A', 'S', 'D']}/>
        </div>
      )
    ]
  },
  {
    bonus: [
      'You managed to get to the teleport! Good job! In the game you can also collect coins. They are not always easily reachable. Sometimes it\'s even impossible to get to them. How lucky are you? 😉',
      undefined
    ]
  },
  {
    enemy: [
      'And the last thing you I wanted to warn you. There are enemies in the maze.\n They are dangerous, but luckily they are moving only on the certain cells that are marked.\n And that\'s all what I wanted to tell you. Good luck!',
      undefined
    ]
  },
];

export default function Tutorial() {
  const level = useSelector((state: RootState) => state.maze.params.level);
  const tutorial = useSelector((state: RootState) => state.gameplay.tutorial);
  
  const content = useMemo(() => {
    if (tutorialContent.length >= level) {
      return tutorialContent[level - 1];
    }
    return undefined;
  }, [level]);
  
  if (tutorial && content) {
    return <TutorialDialog key={level} content={content}/>;
  }
  
  return <></>;
}