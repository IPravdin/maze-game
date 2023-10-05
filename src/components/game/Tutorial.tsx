import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Spinner from '../Spinner';

const tutorialText = {
  introduction: "Hey! Welcome to the tutorial! I will quickly explain the rules of the game. They are simple, so don't worry!",
  goal: "Your goal is reach the teleport. It's pulsating, so you can't miss it! The teleport will move you to the next level.",
  movement: 'To reach the teleport use the Arrow Keys or WASD. Simple, right? Now try to get to the teleport. I will be waiting for you in the next level.',
  bonus: 'Collect all the coins',
  enemy: 'Avoid the enemies',
};
type TutorialStepType = keyof typeof tutorialText;
const steps = Object.keys(tutorialText) as TutorialStepType[]

export default function Tutorial() {
  const player = useSelector((state: RootState) => state.player);
  const tutorial = useSelector((state: RootState) => state.gameplay.tutorial);
  const [tutorialStep, setTutorialStep] = useState<{ index: number, step: TutorialStepType }>({
    index: 0,
    step: steps[0]
  });
  
  if (!player.data) {
    return <Spinner />
  }
  
  if (!tutorial.active) {
    return null;
  }
  
  const next = () => {
    setTutorialStep((prevState) => ({
      index: prevState.index + 1,
      step: steps[prevState.index + 1]
    }))
  };
  
  const isPlayerOnRight = player.params.startCoord.x === 0;
  const position = {
    top: 33,
    left: player.params.playerSize.width * (!isPlayerOnRight ? -1 : 1),
  }
  
  return (
    <div
      className="absolute w-80 h-32 z-30"
      style={position}
    >
      <div className={`chat w-full h-full ${ isPlayerOnRight ? 'chat-start' : 'chat-end' }`}>
        <div className="chat-bubble flex flex-col gap-2 justify-between w-full h-full">
          <p>{tutorialText[tutorialStep.step]}</p>
          <div className="flex justify-end">
            <button className="link link-hover italic" onClick={next}>next</button>
          </div>
        </div>
      </div>
    </div>
  );
}