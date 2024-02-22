import React, { KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { TutorialType } from '../../utils/types/tutorial';
import { useDispatch } from 'react-redux';
import { gameplayActions } from '../../store/slices/gameplay';

export default function TutorialDialog({
  content,
  onKeyDown
}: {
  content: TutorialType,
  onKeyDown?: () => void,
}) {
  const dispatch = useDispatch();
  const steps = Object.keys(content);
  const ref = useRef<HTMLDialogElement>(null);
  
  const [tutorialStep, setTutorialStep] = useState<{ index: number, step: string }>({
    index: 0,
    step: steps[0]
  });
  
  useEffect(() => {
    if (!ref.current) return;
    dispatch(gameplayActions.froze('none'));
    ref.current.showModal();
  }, [ref, content]);
  
  const next = () => {
    setTutorialStep((prevState) => ({
      index: prevState.index + 1,
      step: steps[prevState.index + 1]
    }));
  };
  
  function keyDownHandler(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.code !== 'Space') return;
    
    onKeyDown?.();
    
    if (steps.length - 1 === tutorialStep.index) {
      ref.current?.close();
      dispatch(gameplayActions.unfroze());
      return;
    }
    
    next();
  }
  
  return (
    <dialog className='modal' ref={ref} tabIndex={0} onKeyDown={keyDownHandler}>
      <TutorialScreen
        key={tutorialStep.index}
        title={content[tutorialStep.step][0]}
        content={content[tutorialStep.step][1]}
      />
    </dialog>
  );
}

function TutorialScreen({ title, content }: { title: string, content?: ReactElement }) {
  const titleArray = splitStringToArray(title);
  return (
    <div className='h-full w-full p-20'>
      <div className='h-1/2 flex flex-col justify-center items-center gap-1'>
        {titleArray.map((text, i) => (
          <div key={i}>
            <h1 className='text-4xl'>
              {text}
            </h1>
          </div>
        ))}
      </div>
      <div className='h-1/2 w-full'>{content}</div>
      <div className='flex justify-center'>
        <div className='flex gap-3 text-xl animate-pulse'>
          press
          <kbd className='kbd kbd-md'>space</kbd>
          to continue
        </div>
      </div>
    </div>
  );
}

function splitStringToArray(str: string) {
  return str.split('\n');
}