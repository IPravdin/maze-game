import React, { KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NavigationKbds from '../NavigationKbds';

const tutorialContent: { [key: string]: [string, ReactElement | undefined] } = {
  introduction: [
    "Hey! Welcome to the tutorial!\n I will quickly explain the rules of the game.\n They are simple, so don't worry! Press any key to continue.",
    undefined
  ],
  goal: [
    "Your goal is get to the teleport. It's pulsating, so you can't miss it! The teleport will move you to the next level.",
    undefined
  ],
  movement: [
    'To reach the teleport use the Arrow Keys or WASD. Simple, right? Now try to get to the teleport. I will be waiting for you in the next level.',
    (
      <div className="flex justify-center">
        <NavigationKbds btns={['↑', '←', '↓', '→']} />
        <div className="divider divider-horizontal" />
        <NavigationKbds btns={['W', 'A', 'S', 'D']} />
      </div>
    )
  ],
  bonus: ['Collect all the coins', undefined],
  enemy: ['Avoid the enemies', undefined],
};
type TutorialStepType = keyof typeof tutorialContent;
const steps = Object.keys(tutorialContent) as TutorialStepType[];

export default function Tutorial() {
  const maze = useSelector((state: RootState) => state.maze);
  const tutorial = useSelector((state: RootState) => state.gameplay.tutorial);
  const [tutorialStep, setTutorialStep] = useState<{ index: number, step: TutorialStepType }>({
    index: 0,
    step: steps[0]
  });
  
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    
    if (tutorial.active && maze.params.level < 4) {
      ref.current.showModal();
    }
  }, [ref]);
  
  const next = () => {
    setTutorialStep((prevState) => ({
      index: prevState.index + 1,
      step: steps[prevState.index + 1]
    }))
  };
  
  function keyDownHandler(e: KeyboardEvent<HTMLDialogElement>) {
    e.preventDefault();
    next();
  }
  
  return (
    <dialog className="modal" ref={ref} tabIndex={0} onKeyDown={keyDownHandler}>
      <TutorialScreen
        key={tutorialStep.index}
        title={tutorialContent[tutorialStep.step][0]}
        content={tutorialContent[tutorialStep.step][1]}
      />
    </dialog>
  );
}

function TutorialScreen({ title, content }: { title: string, content?: ReactElement }) {
  const animationClasses = "overflow-hidden border-r-primary border-r-2 animate-typing whitespace-nowrap my-0 mx-auto tracking-widest";
  const titleArray = splitStringToArray(title);
  return (
    <div className="h-full w-full p-20">
      <div className="h-1/2 flex flex-col justify-center items-center">
        {titleArray.map((text) => (
          <h1 className={animationClasses}>
            {text}
          </h1>
        ))}
      </div>
      <div className="h-1/2 w-full">{content}</div>
      <div className="whitespace-nowrap animate-pulse">
        Press Any Key
      </div>
    </div>
  );
}

function splitStringToArray(str: string) {
  return str.split('\n');
}